import React, { useState } from 'react';
import SurveyResultsModal from '../survey-results-modal/survey-results-modal.component';
import './survey-results-product.styles.scss';

const SurveyResultsProduct = ({ product }) => {
  const { id, itemImage, itemName, itemPrice } = product;
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal((prev) => !prev);

  return (
    <div className='survey-results-product-container'>
      <div className='survey-results-product-image-container'>
        <img
          className='survey-results-product-image'
          src={itemImage}
          alt='product'
        />
      </div>
      <div className='survey-results-product-info-container'>
        <p>{itemName}</p>
        <p>{itemPrice}$</p>
      </div>
      <button className='see-survey-results-btn' onClick={handleShowModal}>
        See Results
      </button>
      <SurveyResultsModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        productId={id}
      />
    </div>
  );
};

export default SurveyResultsProduct;
