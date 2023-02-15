import React from 'react';

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
    <div>
      <p className='checkoutProduct_title'>Reviewed by: {reviewerName}</p>
      <p className='checkoutProduct_title'>Quality: {productQuality}</p>
      <p className='checkoutProduct_title'>Fitting: {productFitting}</p>
      <p className='checkoutProduct_title'>Material: {productMaterial}</p>
      <p className='checkoutProduct_title'>
        Value for Money: {productValMoney}
      </p>
      <p className='checkoutProduct_title'>Feedback: {productFeedback}</p>
    </div>
  );
};

export default SurveyResultsModalFriend;
