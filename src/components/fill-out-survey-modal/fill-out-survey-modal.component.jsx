import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../spinner/spinner.component';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Typography, Rating, TextField } from '@mui/material';
import {
  addToSurveyResults,
  submitReview,
} from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';
import './fill-out-survey-modal.styles.scss';

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

const FillOutSurveyModal = ({ showModal, handleShowModal, msg }) => {
  const [quality, setQuality] = useState(0);
  const [fitting, setFitting] = useState(0);
  const [valMoney, setValMoney] = useState(0);
  const [material, setMaterial] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { currentUser } = useContext(UserContext);

  const handleSubmit = async () => {
    const productInfo = {
      name: msg.productName,
      price: msg.productPrice,
      id: msg.productId,
      image: msg.imageUrl,
    };
    const reviewInfo = {
      quality,
      fitting,
      valMoney,
      material,
      feedback,
    };
    await addToSurveyResults(msg.userId, msg.productId, productInfo);
    await submitReview(msg.userId, msg.productId, currentUser, reviewInfo);
    handleShowModal();
  };

  if (
    !msg ||
    !msg.userId ||
    !msg.productName ||
    !msg.productPrice ||
    !msg.productId ||
    !msg.imageUrl
  )
    return null;
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
          <div className='fill-out-survey-modal-close-btn-container'>
            <button
              className='fill-out-survey-modal-close-btn'
              onClick={handleShowModal}
            >
              X
            </button>
          </div>
          <div className='fill-out-survey-modal-product-info-wrapper'>
            <div className='fill-out-survey-modal-product-info-container'>
              <div className='fill-out-survey-modal-prod-img-container'>
                <img
                  className='fill-out-survey-modal-prod-img'
                  src={msg.imageUrl && msg.imageUrl}
                  alt='product'
                />
              </div>
              <div className='fill-out-survey-modal-prod-details-container'>
                <p>{msg.productName && msg.productName}</p>
                <p>&#8377;{msg.productPrice && msg.productPrice}</p>
              </div>
            </div>
            <div className='fill-out-survey-container'>
              <div className='fill-out-survey-individual-container'>
                <Typography component='legend'>
                  Please rate the quality of this product:
                </Typography>
                <Rating
                  name='simple-controlled'
                  value={quality}
                  onChange={(event, newValue) => {
                    setQuality(newValue);
                  }}
                />
              </div>
              <div className='fill-out-survey-individual-container'>
                <Typography component='legend'>
                  Please rate this product on the basis of it's comfortableness
                  and fitting:
                </Typography>
                <Rating
                  name='simple-controlled'
                  value={fitting}
                  onChange={(event, newValue) => {
                    setFitting(newValue);
                  }}
                />
              </div>
              <div className='fill-out-survey-individual-container'>
                <Typography component='legend'>
                  Is it a good value for money?
                </Typography>
                <Rating
                  name='simple-controlled'
                  value={valMoney}
                  onChange={(event, newValue) => {
                    setValMoney(newValue);
                  }}
                />
              </div>
              <div className='fill-out-survey-individual-container'>
                <Typography component='legend'>
                  Is the material and color of this product good?
                </Typography>
                <Rating
                  name='simple-controlled'
                  value={material}
                  onChange={(event, newValue) => {
                    setMaterial(newValue);
                  }}
                />
              </div>
              <div className='fill-out-survey-individual-container'>
                <Typography component='legend'>
                  What is you overall satisfaction with the product?
                </Typography>
                <input
                  type='text'
                  placeholder='Write Feedback...'
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
            </div>
            <div className='fill-out-survey-modal-btn-container'>
              <button
                className='fill-out-survey-modal-btn'
                onClick={handleSubmit}
              >
                Submit Review
              </button>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default FillOutSurveyModal;
