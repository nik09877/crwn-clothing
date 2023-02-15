import React, { useState } from 'react';
import SurveyResultsModal from '../survey-results-modal/survey-results-modal.component';

const SurveyResultsProduct = ({ product }) => {
  const { id, itemImage, itemName, itemPrice } = product;
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal((prev) => !prev);

  return (
    <div>
      <div>
        <img src={itemImage} alt='product' />
        <p>{itemPrice}</p>
        <p>{itemName}</p>
      </div>
      <div>
        <button onClick={handleShowModal}>See Results</button>
      </div>
      <SurveyResultsModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        productId={id}
      />
    </div>
  );
};

export default SurveyResultsProduct;
