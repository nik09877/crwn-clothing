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

import ShareProductModal from '../share-product-modal/share-product-modal.component';
import SeeTwinsModal from '../see-twins-modal/see-twins-modal.component';

const ProductCard = ({ product }) => {
  const [twins, setTwins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTwins, setShowTwins] = useState(false);
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);

  const addProductToCart = async () => await addItemToCart(product);

  const handleShowModal = () => setShowModal((prev) => !prev);
  const handleShowTwins = () => setShowTwins((prev) => !prev);

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
        <div onClick={handleShowTwins}>Twin count:{twins.length}</div>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <div onClick={handleShowModal}>Share</div>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
      <ShareProductModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        product={product}
      />
      <SeeTwinsModal
        showModal={showTwins}
        handleShowModal={handleShowTwins}
        twins={twins}
      />
    </ProductCartContainer>
  );
};

export default ProductCard;
