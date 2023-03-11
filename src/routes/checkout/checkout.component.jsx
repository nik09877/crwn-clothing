import { useContext, useState } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.styles';
import ShareBasketModal from '../../components/share-basket-modal/share-basket-modal.component';
import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal((prev) => !prev);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <Total>Total: ${cartTotal}</Total>
      <div className='share-basket-btn-container'>
        <button className='share-basket-btn' onClick={handleShowModal}>
          Share Cart
        </button>
      </div>
      <ShareBasketModal
        handleShowModal={handleShowModal}
        showModal={showModal}
      />
    </CheckoutContainer>
  );
};

export default Checkout;
