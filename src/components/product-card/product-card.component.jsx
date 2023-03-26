import { useContext, useEffect, useState } from 'react';

import { CartContext } from '../../contexts/cart.context';
import { getTwins } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles';
import './product-card.custom-styles.scss';

import ShareProductModal from '../share-product-modal/share-product-modal.component';
import SeeTwinsModal from '../see-twins-modal/see-twins-modal.component';
import { Tooltip } from '@mui/material';
import AddToSharedCartsModal from '../add-to-shared-carts-modal/add-to-shared-carts-modal.component';

const ProductCard = ({ product }) => {
  const [twins, setTwins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTwins, setShowTwins] = useState(false);
  const [showSharedCarts, setShowSharedCarts] = useState(false);
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);

  const addProductToCart = async () => await addItemToCart(product);

  const handleShowModal = () => setShowModal((prev) => !prev);
  const handleShowTwins = () => setShowTwins((prev) => !prev);
  const handleShowSharedCarts = () => setShowSharedCarts((prev) => !prev);

  useEffect(() => {
    const findTwins = async () => {
      await getTwins(currentUser, product, setTwins);
    };
    findTwins();
  }, []);

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <div className='prod-card-footer-info-container'>
          <Tooltip
            title='See The Number Of Friends Who Have This item In Their Carts'
            placement='bottom'
          >
            <span className='prod-card-twin-cnt' onClick={handleShowTwins}>
              Twins:{twins.length}
            </span>
          </Tooltip>
          <Name>{name}</Name>
        </div>
        <div
          style={{
            display: 'flex',
            flex: '1',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <Price>&#8377;{price}</Price>
          <Tooltip title='Ask For a Review' placement='bottom'>
            <span className='prod-card-share-span' onClick={handleShowModal}>
              <svg
                viewBox='-2.4 -2.4 28.80 28.80'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                <g
                  id='SVGRepo_tracerCarrier'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                ></g>
                <g id='SVGRepo_iconCarrier'>
                  {' '}
                  <path
                    d='M20.7914 12.6075C21.0355 12.3982 21.1575 12.2936 21.2023 12.1691C21.2415 12.0598 21.2415 11.9403 21.2023 11.831C21.1575 11.7065 21.0355 11.6019 20.7914 11.3926L12.3206 4.13202C11.9004 3.77182 11.6903 3.59172 11.5124 3.58731C11.3578 3.58348 11.2101 3.6514 11.1124 3.77128C11 3.90921 11 4.18595 11 4.73942V9.03468C8.86532 9.40813 6.91159 10.4898 5.45971 12.1139C3.87682 13.8846 3.00123 16.176 3 18.551V19.163C4.04934 17.8989 5.35951 16.8766 6.84076 16.166C8.1467 15.5395 9.55842 15.1684 11 15.0706V19.2607C11 19.8141 11 20.0909 11.1124 20.2288C11.2101 20.3487 11.3578 20.4166 11.5124 20.4128C11.6903 20.4084 11.9004 20.2283 12.3206 19.8681L20.7914 12.6075Z'
                    stroke='#555'
                    stroke-width='1.44'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  ></path>{' '}
                </g>
              </svg>
            </span>
          </Tooltip>
        </div>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={handleShowSharedCarts}
        style={{ top: '215px' }}
      >
        Add to Shared Carts
      </Button>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
      {showModal && (
        <ShareProductModal
          showModal={showModal}
          handleShowModal={handleShowModal}
          product={product}
        />
      )}
      {showTwins && (
        <SeeTwinsModal
          showModal={showTwins}
          handleShowModal={handleShowTwins}
          twins={twins}
        />
      )}
      {showSharedCarts && (
        <AddToSharedCartsModal
          showModal={showSharedCarts}
          handleShowModal={handleShowSharedCarts}
          product={product}
        />
      )}
    </ProductCartContainer>
  );
};

export default ProductCard;
