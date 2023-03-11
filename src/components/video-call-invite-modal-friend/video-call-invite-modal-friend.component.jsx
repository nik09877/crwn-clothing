import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { getUser, sendMessage } from '../../utils/firebase/firebase.utils';
import './video-call-invite-modal-friend.styles.scss';

const VideoCallInviteModalFriend = ({ friend, roomUrl }) => {
  const { friendName, friendEmail, friendProfilePic } = friend;
  const { currentUser } = useContext(UserContext);
  const [currentUserDoc, setCurrentUserDoc] = useState({});

  const handleShare = async () => {
    const msg = 'Use this link to join the video call!\n' + `${roomUrl}`;
    await sendMessage(currentUserDoc, friend.id, msg);
  };

  useEffect(() => {
    const getData = async () => {
      setCurrentUserDoc(await getUser(currentUser));
    };
    getData();
  }, []);

  return (
    <div
      className='video-call-invite-modal-friend-container'
      onClick={handleShare}
    >
      <div className='video-call-invite-modal-friend-img-container'>
        <img
          className='video-call-invite-modal-friend-img'
          src={friendProfilePic}
          alt='friend'
        />
      </div>
      <div className='video-call-invite-modal-friend-info-container'>
        <p>{friendName}</p>
        <p>{friendEmail}</p>
      </div>
    </div>
  );
};

export default VideoCallInviteModalFriend;
