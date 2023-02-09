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
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  updateDoc,
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

  // const friends = [];
  // db.collection('users')
  //   .doc(currentUser.uid)
  //   .collection('friends')
  //   .onSnapshot((snapshot) => {
  //     setFriends(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }))
  //     );
  //   });
};

//COMMENT GET USERS
export const getUsers = async (setUsers) => {
  const users = [];
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  setUsers(users);
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
