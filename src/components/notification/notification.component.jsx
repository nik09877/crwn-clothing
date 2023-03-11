import React, { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
  acceptFriendRequest,
  declineFriendRequest,
} from '../../utils/firebase/firebase.utils';
import './notification.styles.scss';

const Notification = ({ friendRequest, getRequests }) => {
  const { currentUser } = useContext(UserContext);
  const { requestName, requestEmail, requestPic } = friendRequest;

  const handleAccept = async () => {
    await acceptFriendRequest(currentUser, friendRequest);
    await getRequests();
  };
  const handleDecline = async () => {
    await declineFriendRequest(currentUser, friendRequest);
    await getRequests();
  };

  return (
    <div className='notification-container'>
      <div className='notification-img-container'>
        <img className='notification-user-img' src={requestPic} alt='' />
      </div>
      <div className='notification-user-info-container'>
        <h3 className='notification-name'>{requestName}</h3>
        <h5 className='notification-email'>{requestEmail}</h5>
      </div>
      <div className='notification-btns-container'>
        <button className='notification-btn accept-btn' onClick={handleAccept}>
          Accept
        </button>
        <button
          className='notification-btn decline-btn'
          onClick={handleDecline}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default Notification;
