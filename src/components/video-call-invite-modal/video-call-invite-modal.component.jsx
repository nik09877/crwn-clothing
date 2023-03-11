import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { getFriends } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';
import ShareProductModalFriend from '../share-product-modal-friend/share-product-modal-friend.component';
import VideoCallInviteModalFriend from '../video-call-invite-modal-friend/video-call-invite-modal-friend.component';
import './video-call-invite-modal.styles.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const VideoCallInviteModalFriends = ({ friends, roomUrl }) => {
  return (
    <div className='video-call-invite-modal-friends-container'>
      {friends.map((friend) => (
        <VideoCallInviteModalFriend
          key={friend.id}
          friend={friend}
          roomUrl={roomUrl}
        />
      ))}
    </div>
  );
};
const VideoCallInviteModal = ({ showModal, handleShowModal, roomUrl }) => {
  const [friends, setFriends] = useState([]);
  const { currentUser } = useContext(UserContext);

  const getAllFriends = async () => await getFriends(currentUser, setFriends);

  useEffect(() => {
    getAllFriends();
  }, []);

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={showModal}
      onClose={handleShowModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={showModal}>
        <Box
          sx={style}
          style={{
            height: '600px',
            width: '600px',
            overflowY: 'scroll',
          }}
        >
          <div className='video-call-invite-modal-close-btn-container'>
            <button
              className='video-call-invite-modal-close-btn'
              onClick={handleShowModal}
            >
              X
            </button>
          </div>
          {friends && (
            <VideoCallInviteModalFriends friends={friends} roomUrl={roomUrl} />
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default VideoCallInviteModal;
