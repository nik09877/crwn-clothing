import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  collection,
  writeBatch,
  query,
  onSnapshot,
  orderBy,
  limit,
  addDoc,
  serverTimestamp, //for real time data fetching
} from 'firebase/firestore';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDbA12ZqUPQSkLvUmnJhgNqCVRb6Kglyv4',
  authDomain: 'crwn-db-e6798.firebaseapp.com',
  projectId: 'crwn-db-e6798',
  storageBucket: 'crwn-db-e6798.appspot.com',
  messagingSenderId: '96970754250',
  appId: '1:96970754250:web:ed21869eb1c0a4dfb6cc33',
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage();

//////////////////////////////////////////////////////////////
//SIGN IN WITH GOOGLE
//////////////////////////////////////////////////////////////
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//////////////////////////////////////////////////////////////
//SIGN IN, SIGN UP AND SIGN OUT WITH EMAIL AND PASSWORD
//////////////////////////////////////////////////////////////
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

//COMMENT UPDATE USER AUTHENTICATION DETAILS
export const updateAuthProfile = async (fieldName, fieldVal) => {
  updateProfile(auth.currentUser, {
    fieldName: fieldVal,
  })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

//////////////////////////////////////////////////////////////
//GET YOUR DATABASE
//////////////////////////////////////////////////////////////
export const db = getFirestore();

///////////////////////////////////////////////////////////////
//ADD COLLECTION AND ITS DOCUMENTS AT ONCE IN BULK
//////////////////////////////////////////////////////////////
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  docKey
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

//////////////////////////////////////////////////////////////
// CRUD OPERATIONS ON 'USERS' COLLECTION
//////////////////////////////////////////////////////////////

//COMMENT GET USERS
export const getUsers = async (setUsers) => {
  const users = [];
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  setUsers(users);
};

//COMMENT GET USER
export const getUser = async (currentUser) => {
  const docRef = doc(db, 'users', currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log('No such document!');
    return {};
  }
};

//COMMENT UPDATE USER
export const updateUser = async (
  currentUser,
  collectionName,
  fieldName,
  fieldVal
) => {
  const docRef = doc(db, collectionName, currentUser.uid);

  await updateDoc(docRef, {
    [fieldName]: fieldVal,
  });
};

//COMMENT CREATE USER
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        profilePic:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
        subtotal: 0,
        noItems: 0,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

//COMMENT GET FRIENDS
export const getFriends = async (currentUser, setFriends) => {
  const friends = [];
  const querySnapshot = await getDocs(
    collection(db, 'users', currentUser.uid, 'friends')
  );
  querySnapshot.forEach((doc) => {
    friends.push({ id: doc.id, ...doc.data() });
  });
  setFriends(friends);
};

//COMMENT GET FRIEND
export const getFriend = async (currentUser, friendId) => {
  const docRef = doc(db, 'users', currentUser.uid, 'friends', friendId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log('No such document!');
    return {};
  }
};

//COMMENT GET FRIEND REQUESTS
export const getFriendRequests = async (currentUser, setFriendRequests) => {
  const friendRequests = [];
  const querySnapshot = await getDocs(
    collection(db, 'users', currentUser.uid, 'friendRequests')
  );
  querySnapshot.forEach((doc) => {
    friendRequests.push({ id: doc.id, ...doc.data() });
  });
  setFriendRequests(friendRequests);
};

//COMMENT CHECK FRIEND OR NOT
export const checkFriend = async (currentUser, friend, setIsFriend) => {
  const docRef = doc(db, 'users', currentUser.uid, 'friends', friend.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setIsFriend(true);
  } else {
  }
};

//COMMENT SEND FRIEND REQUEST
export const sendFriendRequest = async (currentUser, friend) => {
  const currentUserDoc = await getUser(currentUser);
  await setDoc(
    doc(db, 'users', friend.id, 'friendRequests', currentUser.uid),
    {
      requestName: currentUserDoc.displayName,
      requestEmail: currentUserDoc.email,
      requestPic: currentUserDoc.profilePic,
      requestAccepted: false,
    }
    // { merge: true }
  );
};

//COMMENT ACCEPT FRIEND REQUEST AND ADD FRIEND
export const acceptFriendRequest = async (currentUser, friend) => {
  try {
    const currentUserDoc = await getUser(currentUser);
    await setDoc(doc(db, 'users', currentUser.uid, 'friends', friend.id), {
      friendEmail: friend.requestEmail,
      friendName: friend.requestName,
      friendProfilePic: friend.requestPic,
    });
    await setDoc(doc(db, 'users', friend.id, 'friends', currentUser.uid), {
      friendEmail: currentUserDoc.email,
      friendName: currentUserDoc.displayName,
      friendProfilePic: currentUserDoc.profilePic,
    });
    await declineFriendRequest(currentUser, friend);
  } catch (err) {
    console.log(err);
  }
};

//COMMENT DECLINE FRIEND REQUEST
export const declineFriendRequest = async (currentUser, friend) => {
  await deleteDoc(
    doc(db, 'users', currentUser.uid, 'friendRequests', friend.id)
  );
};

//COMMENT GET ALL MESSAGES
export const getMessages = async (currentUser, friendId) => {
  const msgs = [];
  // const q = query(
  //   collection(db, 'users', currentUser.uid, 'friends', friendId, 'messages'),
  //   orderBy('timestamp', 'asc')
  //   // limit(40)
  // );
  // const unsub = onSnapshot(q, (querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     msgs.push({ id: doc.id, ...doc.data() });
  //   });
  // });
  const q = query(
    collection(db, 'users', currentUser.uid, 'friends', friendId, 'messages'),
    orderBy('timestamp', 'asc')
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    msgs.push({ id: doc.id, ...doc.data() });
  });
  return msgs;
};

//COMMENT SEND MESSAGE
export const sendMessage = async (
  currentUserDoc,
  friendId,
  msg,
  otherInfo = {}
) => {
  await addDoc(
    collection(db, 'users', currentUserDoc.id, 'friends', friendId, 'messages'),
    {
      message: msg,
      name: currentUserDoc.displayName,
      timestamp: serverTimestamp(),
      ...otherInfo,
    }
  );
  await addDoc(
    collection(db, 'users', friendId, 'friends', currentUserDoc.id, 'messages'),
    {
      message: msg,
      name: currentUserDoc.displayName,
      timestamp: serverTimestamp(),
      ...otherInfo,
    }
  );
};

//COMMENT GET ALL BASKET ITEMS
export const getCartItems = async (currentUser, setCartItems) => {
  const cartItems = [];
  const querySnapshot = await getDocs(
    collection(db, 'users', currentUser.uid, 'basketItems')
  );
  querySnapshot.forEach((doc) => {
    /*
    BASKET ITEM                           
    itemId: id,
    itemName: title,
    itemImage: image,
    itemPrice: price,
    itemRating: rating,
    itemQuantity: quantity + 1,

    CART ITEM
    id
    imageUrl
    name
    price
    */
    const basketItem = doc.data();
    cartItems.push({
      id: basketItem.itemId,
      imageUrl: basketItem.itemImage,
      name: basketItem.itemName,
      price: basketItem.itemPrice,
      quantity: basketItem.itemQuantity,
    });
  });
  setCartItems(cartItems);
};

//COMMENT ADD ITEM TO BASKET
export const addItemToBasket = async (currentUser, product) => {
  //Id HAS TO BE A STRING , IT CAN'T BE A NUMBER
  const id = String(product.id);
  await setDoc(
    doc(db, 'users', currentUser.uid, 'basketItems', id),
    {
      itemId: product.id,
      itemName: product.name,
      itemImage: product.imageUrl,
      itemPrice: product.price,
      itemQuantity: 1,
    }
    // { merge: true }
  );
};

//COMMENT UPDATE ITEM IN BASKET
export const updateItemInBasket = async (currentUser, product, type) => {
  //Id HAS TO BE A STRING , IT CAN'T BE A NUMBER
  const id = String(product.id);

  const docSnap = await getDoc(
    doc(db, 'users', currentUser.uid, 'basketItems', id)
  );
  const basketItem = docSnap.data();
  const newQuantity =
    type === 'inc' ? basketItem.itemQuantity + 1 : basketItem.itemQuantity - 1;

  const docRef = doc(db, 'users', currentUser.uid, 'basketItems', id);
  await updateDoc(docRef, {
    itemQuantity: newQuantity,
  });
};

//COMMENT DELETE ITEM FROM BASKET
export const deleteItemFromBasket = async (currentUser, product) => {
  //Id HAS TO BE A STRING , IT CAN'T BE A NUMBER
  const id = String(product.id);
  await deleteDoc(doc(db, 'users', currentUser.uid, 'basketItems', id));
};

//COMMENT UPDATE CART PRICE
export const updateCartPrice = async (currentUser, newCartPrice) => {
  const docRef = doc(db, 'users', currentUser.uid);
  await updateDoc(docRef, {
    subtotal: newCartPrice,
  });
};

//COMMENT UPDATE CART ITEMS COUNT
export const updateCartItemsCount = async (currentUser, newCartItemsCnt) => {
  const docRef = doc(db, 'users', currentUser.uid);
  await updateDoc(docRef, {
    noItems: newCartItemsCnt,
  });
};

//COMMENT FIND FRIENDS WHO HAVE THE CURRRENT PRODUCT IN THEIR CART
export const getTwins = async (currentUser, product, setTwins) => {
  const friends = [];
  const twins = [];
  const querySnapshot = await getDocs(
    collection(db, 'users', currentUser.uid, 'friends')
  );
  querySnapshot.forEach((doc) => {
    friends.push({ id: doc.id, ...doc.data() });
  });
  friends.forEach(async (friend) => {
    //Id HAS TO BE A STRING , IT CAN'T BE A NUMBER
    const id = String(product.id);
    const docRef = doc(db, 'users', friend.id, 'basketItems', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { friendName, friendEmail, friendProfilePic } = friend;
      twins.push({ friendName, friendEmail, friendProfilePic });
    }
    setTwins(twins);
  });
};

//COMMENT CHECK FRIEND's BASKET ACCESS PERMISSIONS
export const checkBasketAccessPermission = async (
  currentUser,
  friend,
  type
) => {
  const docSnap = await getDoc(
    doc(db, 'users', friend.id, 'friends', currentUser.uid)
  );
  if (type === 'read') return docSnap.data().read;
  return docSnap.data().write;
};

//COMMENT UPDATE SHARE BASKET PERMISSIONS
export const updateShareBasketPermission = (currentUser, friend, type) => {
  const docRef = doc(db, 'users', friend.id, 'friends', currentUser.uid);
  switch (type) {
    case 'GIVE_READ_ACCESS':
      setDoc(docRef, { read: true, write: false }, { merge: true });
      break;
    case 'GIVE_COMPLETE_ACCESS':
      setDoc(docRef, { read: true, write: true }, { merge: true });
      break;
    case 'REVOKE_EDIT_ACCESS':
      updateDoc(docRef, { write: false });
      break;
    case 'REVOKE_COMPLETE_ACCESS':
      updateDoc(docRef, { read: false, write: false });
      break;
    default:
      break;
  }
};

//COMMENT GET ALL THE FRIENDS THAT HAVE SHARED THEIR BASKETS
export const getSharedBasketFriends = async (currentUser) => {
  const friends = [];
  const querySnapshot = await getDocs(
    collection(db, 'users', currentUser.uid, 'friends')
  );
  querySnapshot.forEach((doc) => {
    const curFrnd = { id: doc.id, ...doc.data() };
    if (curFrnd?.read || curFrnd?.write) friends.push(curFrnd);
  });
  return friends;
};

//COMMENT ADD PRODUCT TO SURVEY RESULTS
export const addToSurveyResults = async (userId, itemId, itemInfo) => {
  const productId = String(itemId);
  await setDoc(doc(db, 'users', userId, 'surveyResults', productId), {
    itemId: itemInfo.id,
    itemName: itemInfo.name,
    itemImage: itemInfo.image,
    itemPrice: itemInfo.price,
  });
};

//COMMENT ADD REVIEW FOR A SPECIFIC PRODUCT IN SURVEY RESULTS
export const submitReview = async (userId, itemId, currentUser, info) => {
  const currentUserDoc = await getUser(currentUser);
  const productId = String(itemId);
  await setDoc(
    doc(
      db,
      'users',
      userId,
      'surveyResults',
      productId,
      'reviews',
      currentUser.uid
    ),
    {
      reviewerName: currentUserDoc.displayName,
      productQuality: info.quality,
      productFitting: info.fitting,
      productValMoney: info.valMoney,
      productMaterial: info.material,
      productFeedback: info.feedback,
    }
  );
};

//COMMENT UPLOAD PROFILE PIC TO STORAGE
export const uploadProfilePic = async (currentUser, file, setProfilePic) => {
  const metadata = {
    contentType: 'image/jpeg',
  };
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, currentUser.email + '-photo-' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    'state_changed',
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        try {
          //update user in authentication
          await updateProfile(currentUser, {
            photoURL: downloadURL,
          });

          //update user doc in users collection
          const docRef = doc(db, 'users', currentUser.uid);
          await updateDoc(docRef, {
            profilePic: downloadURL,
          });
          setProfilePic(downloadURL);
        } catch (err) {
          console.log(err);
        }
      });
    }
  );
};

//////////////////////////////////////////////////////////////
// CRUD OPERATIONS ON 'CATEGORIES' COLLECTION
//////////////////////////////////////////////////////////////
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};
