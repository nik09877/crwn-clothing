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
import './share-product-modal.styles.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '5px',
  border: '2px solid black',
};

const ShareProductModalFriends = ({ friends, product }) => {
  return (
    <div className='share-product-modal-friends-container'>
      {friends.map((friend) => (
        <ShareProductModalFriend
          key={friend.id}
          friend={friend}
          product={product}
        />
      ))}
    </div>
  );
};
const ShareProductModal = ({ showModal, handleShowModal, product }) => {
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
          <div className='share-product-modal-close-btn-container'>
            <button
              className='share-product-modal-close-btn'
              onClick={handleShowModal}
            >
              X
            </button>
          </div>
          {friends && (
            <ShareProductModalFriends friends={friends} product={product} />
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ShareProductModal;
