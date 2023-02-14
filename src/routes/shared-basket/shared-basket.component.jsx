import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SharedBasketItem from '../../components/shared-basket-item/shared-basket-item.component';
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './shared-basket.styles';

import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase.utils';

const SharedBasket = () => {
  const { basketId } = useParams();
  const location = useLocation();
  const { write } = location.state;
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItemCnt, setCartItemCnt] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, 'users', basketId, 'basketItems'),
      where('itemPrice', '>', 0)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cart = [];
      querySnapshot.forEach((doc) => {
        const basketItem = doc.data();
        cart.push({
          id: basketItem.itemId,
          imageUrl: basketItem.itemImage,
          name: basketItem.itemName,
          price: basketItem.itemPrice,
          quantity: basketItem.itemQuantity,
        });
      });
      setCartItems(cart);
    });
    return unsubscribe;
  }, [basketId]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', basketId), (doc) => {
      setCartTotal(doc.data().subtotal);
    });
    return unsub;
  }, [basketId]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', basketId), (doc) => {
      setCartItemCnt(doc.data().noItems);
    });
    return unsub;
  }, [basketId]);

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
      {cartItems &&
        cartItems.map((cartItem) => (
          <SharedBasketItem
            key={cartItem.id}
            cartItem={cartItem}
            basketId={basketId}
            noItems={cartItemCnt}
            cartTotal={cartTotal}
            write={write}
          />
        ))}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default SharedBasket;
