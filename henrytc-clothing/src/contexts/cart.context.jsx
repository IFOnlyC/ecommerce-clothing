import { createContext, useState, useEffect } from 'react';

/**
 * This helper function is used to find if cartItems contains the productToAdd
 * If found, increment the quantity
 * return new array with modified cartItems
 * @param {[]} cartItems
 * @param {object} productToAdd
 */
const addCartItemHelper = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

/**
 * This helper function is used to find if cartItems contains the productToAdd
 * If found, decrement the quantity
 * If the quantity equals one, then remove the item
 * return modified cartItems with matching cart item with reduced quantity
 * @param {[]} cartItems
 * @param {object} cartItemToRemove
 */
const removeCartItemHelper = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItemHelper = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  total: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    /**
     * array1.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
     */
    const newCartCount = cartItems.reduce(
      (curTotal, curCartItem) => (curTotal += curCartItem.quantity),
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    /**
     * array1.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
     */
    const newCartTotal = cartItems.reduce(
      (curTotal, curCartItem) =>
        (curTotal += curCartItem.quantity * curCartItem.price),
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItemHelper(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItemHelper(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItemHelper(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
