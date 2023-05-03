import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import { selectCartItems } from '../../store/cart/cart.selector';

import './cart-dropdown.style.scss';

const CartDropDown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const goToCheckoutPage = () => navigate('/checkout');

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length === 0 ? (
          <span>Your Cart is empty.</span>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        )}
      </div>
      <Button onClick={goToCheckoutPage}>Check Out</Button>
    </div>
  );
};

export default CartDropDown;
