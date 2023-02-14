import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase.utils';
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './shared-basket-item.styles';

const SharedBasketItem = ({
  cartItem,
  basketId,
  noItems,
  cartTotal,
  write,
}) => {
  const { id, name, imageUrl, price, quantity } = cartItem;

  const clearItemHandler = async () => {
    if (!write) {
      alert("You Don't Have Edit Access To This Cart!");
      return;
    }
    const itemId = String(id);
    await deleteDoc(doc(db, 'users', basketId, 'basketItems', itemId));
    await updateDoc(doc(db, 'users', basketId), {
      noItems: noItems - quantity,
      subtotal: cartTotal - price * quantity,
    });
  };

  const addItemHandler = async () => {
    if (!write) {
      alert("You Don't Have Edit Access To This Cart!");
      return;
    }
    const itemId = String(id);
    await updateDoc(doc(db, 'users', basketId, 'basketItems', itemId), {
      itemQuantity: quantity + 1,
    });
    await updateDoc(doc(db, 'users', basketId), {
      noItems: noItems + 1,
      subtotal: cartTotal + price,
    });
  };

  const removeItemHandler = async () => {
    if (!write) {
      alert("You Don't Have Edit Access To This Cart!");
      return;
    }
    if (quantity === 1) await clearItemHandler();
    else {
      const itemId = String(id);
      await updateDoc(doc(db, 'users', basketId, 'basketItems', itemId), {
        itemQuantity: quantity - 1,
      });
      await updateDoc(doc(db, 'users', basketId), {
        noItems: noItems - 1,
        subtotal: cartTotal - price,
      });
    }
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default SharedBasketItem;
