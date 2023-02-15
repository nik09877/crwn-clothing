import React, { useContext, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { UserContext } from '../../contexts/user.context';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase.utils';
import SurveyResultsModalFriend from '../survey-results-modal-friend/survey-results-modal-friend.component';

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

const SurveyResultsModal = ({ showModal, handleShowModal, productId }) => {
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const q = query(
      collection(
        db,
        'users',
        currentUser.uid,
        'surveyResults',
        productId,
        'reviews'
      )
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const rvws = [];
      querySnapshot.forEach((doc) => {
        rvws.push({ id: doc.id, ...doc.data() });
      });
      setReviews(rvws);
    });

    return unsub;
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
          <div>
            <button onClick={handleShowModal}>X</button>
          </div>
          {reviews &&
            reviews.map((review) => (
              <SurveyResultsModalFriend key={review.id} review={review} />
            ))}
        </Box>
      </Fade>
    </Modal>
  );
};

export default SurveyResultsModal;
