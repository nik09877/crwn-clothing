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
import SeeTwinsModalFriend from '../see-twins-modal-friend/see-twins-modal-friend.component';
import './see-twins-modal.styles.scss';

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

const SeeTwinsModalFriends = ({ twins }) => {
  return (
    <div className='see-twins-modal-friends-container'>
      {twins.map((twin) => (
        <SeeTwinsModalFriend key={twin.id} twin={twin} />
      ))}
    </div>
  );
};

const SeeTwinsModal = ({ showModal, handleShowModal, twins }) => {
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
          <div className='see-twins-modal-close-btn-container'>
            <button
              className='see-twins-modal-close-btn'
              onClick={handleShowModal}
            >
              X
            </button>
          </div>
          {twins && <SeeTwinsModalFriends twins={twins} />}
        </Box>
      </Fade>
    </Modal>
  );
};

export default SeeTwinsModal;
