import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { getUser, sendMessage } from '../../utils/firebase/firebase.utils';

const ShareProductModalFriend = ({ friend, product }) => {
  const { friendName, friendEmail, friendProfilePic } = friend;
  const { currentUser } = useContext(UserContext);
  const [currentUserDoc, setCurrentUserDoc] = useState({});

  const handleShare = async () => {
    const msg = 'Click To Share Your Review of This Product!';
    const otherInfo = {
      imageUrl: product.imageUrl,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      userId: currentUser.uid,
    };
    await sendMessage(currentUserDoc, friend.id, msg, otherInfo);
  };

  useEffect(() => {
    const getData = async () => {
      setCurrentUserDoc(await getUser(currentUser));
    };
    getData();
  }, []);

  return (
    <div className='share-product-modal-friend-container' onClick={handleShare}>
      <img src={friendProfilePic} alt='friend' />
      <p>{friendName}</p>
      <p>{friendEmail}</p>
    </div>
  );
};

export default ShareProductModalFriend;
