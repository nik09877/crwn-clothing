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
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const [twins, setTwins] = useState([]);
  const navigate = useNavigate();

  const addProductToCart = async () => await addItemToCart(product);

  const handleShowTwins = () => {
    if (twins.length > 0) {
      navigate('/see-twins', { state: twins });
    }
  };

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
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
