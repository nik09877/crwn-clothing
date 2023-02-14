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

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

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

const ProductCard = ({ product }) => {
  const [twins, setTwins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const addProductToCart = async () => await addItemToCart(product);

  const handleShowModal = () => setShowModal((prev) => !prev);
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
        <div onClick={handleShowModal}>Review</div>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
      {/*showModal && (
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
            <Box sx={style}></Box>
          </Fade>
        </Modal>
        )*/}
    </ProductCartContainer>
  );
};

export default ProductCard;
