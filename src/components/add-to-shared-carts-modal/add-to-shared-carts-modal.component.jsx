import React, { useContext, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { UserContext } from '../../contexts/user.context';
import './add-to-shared-carts-modal.styles.scss';
import {
  getFriend,
  getSharedBasketFriendsWithWriteAccess,
} from '../../utils/firebase/firebase.utils';
import AddToSharedCartsModalFriend from '../add-to-shared-carts-modal-friend/add-to-shared-carts-modal-friend.component';

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

const AddToSharedCartsModalFriends = ({ friends, product }) => {
  return (
    <div className='add-to-shared-carts-modal-friends-container'>
      {friends.map((friend) => (
        <AddToSharedCartsModalFriend
          key={friend.id}
          friend={friend}
          product={product}
        />
      ))}
    </div>
  );
};

const AddToSharedCartsModal = ({ showModal, handleShowModal, product }) => {
  const [friends, setFriends] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getFriends = async () => {
      const tempFriends = await getSharedBasketFriendsWithWriteAccess(
        currentUser
      );
      setFriends(tempFriends);
    };
    getFriends();
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
          <div className='add-to-shared-carts-modal-close-btn-container'>
            <button
              className='add-to-shared-carts-modal-close-btn'
              onClick={handleShowModal}
            >
              X
            </button>
          </div>
          {friends.length !== 0 && (
            <AddToSharedCartsModalFriends friends={friends} product={product} />
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddToSharedCartsModal;
