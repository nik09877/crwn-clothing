import React, { Fragment, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
  checkFriend,
  deleteFriend,
  sendFriendRequest,
} from '../../utils/firebase/firebase.utils';

import './user.styles.scss';

const User = ({ user }) => {
  const [isFriend, setIsFriend] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [requestSent, setRequestSent] = useState(false);
  const [deleteRequestSent, setDeleteRequestSent] = useState(false);

  const handleAddFriend = async () => {
    await sendFriendRequest(currentUser, user);
    setRequestSent(true);
  };

  const handleDeleteFriend = async () => {
    await deleteFriend(currentUser, user);
    setDeleteRequestSent(true);
  };
  useEffect(() => {
    const checkIsFriendOrNot = async () => {
      await checkFriend(currentUser, user, setIsFriend);
    };
    checkIsFriendOrNot();
  }, [deleteRequestSent]);

  // if (isFriend) return <Fragment />;
  return (
    <div className='user-container'>
      <div className='user-bg-photo'></div>
      <div className='user-img-container'>
        <img
          className='user-face-photo'
          src={user.profilePic}
          alt='user-profile-pic'
        />
      </div>
      <div className='user-info-container'>
        <h3 className='user-name'>{user.displayName}</h3>
        <h5 className='user-email'>{user.email}</h5>
        {isFriend ? (
          <button
            className='user-add-friend-btn'
            disabled={true}
            onClick={handleDeleteFriend}
          >
            Already Friends!
          </button>
        ) : (
          <button
            className='user-add-friend-btn'
            disabled={requestSent || isFriend}
            onClick={handleAddFriend}
          >
            Add Friend
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
