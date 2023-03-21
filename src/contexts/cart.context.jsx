import { collection, onSnapshot, query } from 'firebase/firestore';
import { createContext, useState, useEffect, useContext } from 'react';
import {
  addItemToBasket,
  db,
  deleteItemFromBasket,
  getCartItems,
  updateCartItemsCount,
  updateCartPrice,
  updateItemInBasket,
} from '../utils/firebase/firebase.utils';
import { UserContext } from './user.context';

const addCartItem = async (cartItems, productToAdd, currentUser) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    await updateItemInBasket(currentUser, productToAdd, 'inc');
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  await addItemToBasket(currentUser, productToAdd);
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = async (cartItems, cartItemToRemove, currentUser) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    await deleteItemFromBasket(currentUser, cartItemToRemove);
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  await updateItemInBasket(currentUser, cartItemToRemove, 'dec');
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = async (cartItems, cartItemToClear, currentUser) => {
  await deleteItemFromBasket(currentUser, cartItemToClear);
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: async () => {},
  removeItemFromCart: async () => {},
  clearItemFromCart: async () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    //COMMENT WAS PERFECTLY WORKING CODE
    // const getAllCartItems = async () => {
    //   await getCartItems(currentUser, setCartItems);
    // };
    // getAllCartItems();

    //COMMENT NOT WORKING
    const q = query(collection(db, 'users', currentUser.uid, 'basketItems'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const basketItem = doc.data();
        items.push({
          id: basketItem.itemId,
          imageUrl: basketItem.itemImage,
          name: basketItem.itemName,
          price: basketItem.itemPrice,
          quantity: basketItem.itemQuantity,
        });
      });
      setCartItems(items);
    });

    return unsub;
  }, []);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const updateCount = async () => {
      await updateCartItemsCount(currentUser, newCartCount);
      setCartCount(newCartCount);
    };
    updateCount();
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    const updateTotal = async () => {
      await updateCartPrice(currentUser, newCartTotal);
      setCartTotal(newCartTotal);
    };
    updateTotal();
  }, [cartItems]);

  const addItemToCart = async (productToAdd) => {
    const items = await addCartItem(cartItems, productToAdd, currentUser);
    setCartItems(items);
  };

  const removeItemToCart = async (cartItemToRemove) => {
    const items = await removeCartItem(
      cartItems,
      cartItemToRemove,
      currentUser
    );
    setCartItems(items);
  };

  const clearItemFromCart = async (cartItemToClear) => {
    const items = await clearCartItem(cartItems, cartItemToClear, currentUser);
    setCartItems(items);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
