import React, { Fragment, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
  checkFriend,
  sendFriendRequest,
} from '../../utils/firebase/firebase.utils';

const User = ({ user }) => {
  const [isFriend, setIsFriend] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [requestSent, setRequestSent] = useState(false);

  const handleAddFriend = async () => {
    await sendFriendRequest(currentUser, user);
    setRequestSent(true);
  };

  useEffect(() => {
    const checkIsFriendOrNot = async () => {
      await checkFriend(currentUser, user, setIsFriend);
    };
    checkIsFriendOrNot();
  }, []);

  if (isFriend) return <Fragment />;
  return (
    <div className='user-container'>
      <img src={user.profilePic} alt='user-profile-pic' />
      <p>{user.displayName}</p>
      <p>{user.email}</p>
      <button disabled={requestSent} onClick={handleAddFriend}>
        Add Friend
      </button>
    </div>
  );
};

export default User;
