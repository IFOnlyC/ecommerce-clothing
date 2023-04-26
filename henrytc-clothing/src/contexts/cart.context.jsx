import { createContext, useState, useEffect } from 'react';

/**
 * This helper function is used to find if cartItems contains the productToAdd
 * If found, increment the quantity
 * return new array with modified cartItems
 * @param {[]} cartItems
 * @param {object} productToAdd
 */
const addCartItemHelper = (cartItems, productToAdd) => {
  const isItemExisted = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (isItemExisted) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (curTotal, curCartItem) => (curTotal += curCartItem.quantity),
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItemHelper(cartItems, productToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
