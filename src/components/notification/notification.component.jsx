import React, { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
  acceptFriendRequest,
  declineFriendRequest,
} from '../../utils/firebase/firebase.utils';

const Notification = ({ friendRequest, forceRender }) => {
  const { currentUser } = useContext(UserContext);
  const { requestName, requestEmail, requestPic } = friendRequest;

  const handleAccept = async () => {
    await acceptFriendRequest(currentUser, friendRequest);
    forceRender();
  };
  const handleDecline = async () => {
    await declineFriendRequest(currentUser, friendRequest);
    forceRender();
  };

  return (
    <div className='notification-container'>
      <img src={requestPic} alt='' />
      <p>{requestName}</p>
      <p>{requestEmail}</p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleDecline}>Decline</button>
    </div>
  );
};

export default Notification;