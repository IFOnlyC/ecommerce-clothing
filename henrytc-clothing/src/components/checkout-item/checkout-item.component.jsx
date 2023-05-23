import { useDispatch } from 'react-redux';

import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from '../../store/cart/cart.reducer';

import './checkout-item.style.scss';

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, price, quantity, imageUrl } = cartItem;

  const clearItemFromCartHandler = () => dispatch(clearItemFromCart(cartItem));
  const addItemToCartHandler = () => dispatch(addItemToCart(cartItem));
  const removeItemFromCartHandler = () =>
    dispatch(removeItemFromCart(cartItem));

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow increment' onClick={addItemToCartHandler}>
          &#10133;
        </div>
        <span className='quantity-value'>{quantity}</span>
        <div className='arrow decrement' onClick={removeItemFromCartHandler}>
          &#10134;
        </div>
      </span>
      <span className='price'>${price}</span>
      <div className='remove-button' onClick={clearItemFromCartHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
