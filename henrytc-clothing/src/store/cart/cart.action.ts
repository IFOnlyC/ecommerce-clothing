import { CategoryItem } from '../categories/categories.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';
import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducer/reducer.utils';

/**
 * This helper function is used to find if cartItems contains the productToAdd
 * If found, increment the quantity
 * return new array with modified cartItems
 * @param {[]} cartItems
 * @param {object} productToAdd
 */
const addCartItemHelper = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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
const removeCartItemHelper = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItemHelper = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
});

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItemHelper(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem
) => {
  const newCartItems = removeCartItemHelper(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  cartItemToClear: CartItem
) => {
  const newCartItems = clearCartItemHelper(cartItems, cartItemToClear);
  return setCartItems(newCartItems);
};
