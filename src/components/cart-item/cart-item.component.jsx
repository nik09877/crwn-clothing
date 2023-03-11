import { CartItemContainer, ItemDetails } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity}{' '}
          <span
            style={{
              display: 'inline-block',
              margin: '0 3px',
            }}
          >
            x
          </span>{' '}
          &#8377;{price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
