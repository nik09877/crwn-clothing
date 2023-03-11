import { Rating } from '@mui/material';
import React, { Fragment } from 'react';
import './survey-results-modal-friend.styles.scss';

const SurveyResultsModalFriend = ({ review }) => {
  const {
    productFeedback,
    productFitting,
    productMaterial,
    productQuality,
    productValMoney,
    reviewerName,
  } = review;

  return (
    <div className='survey-results-modal-friend-container'>
      <h2 className='checkoutProduct_title'>Reviewed By {reviewerName}</h2>
      <div className='survey-results-modal-friend-review-container'>
        <p className='survey-results-modal-friend-review-name'>Quality: </p>
        <Rating
          className='survey-results-modal-rating'
          name='read-only'
          value={productQuality}
          readOnly
        />
      </div>
      <div className='survey-results-modal-friend-review-container'>
        <p className='survey-results-modal-friend-review-name'>Fitting: </p>
        <Rating
          className='survey-results-modal-rating'
          name='read-only'
          value={productFitting}
          readOnly
        />
      </div>
      <div className='survey-results-modal-friend-review-container'>
        <p className='survey-results-modal-friend-review-name'>Material: </p>
        <Rating
          className='survey-results-modal-rating'
          name='read-only'
          value={productMaterial}
          readOnly
        />
      </div>
      <div className='survey-results-modal-friend-review-container'>
        <p className='survey-results-modal-friend-review-name'>
          Value for Money:
        </p>
        <Rating
          className='survey-results-modal-rating'
          name='read-only'
          value={productValMoney}
          readOnly
        />
      </div>
      <div className='survey-results-modal-friend-review-container'>
        <p className='survey-results-modal-friend-review-name'>Feedback:</p>
        <p className='survey-results-modal-feedback'>{productFeedback}</p>
      </div>
    </div>
  );
};

export default SurveyResultsModalFriend;
