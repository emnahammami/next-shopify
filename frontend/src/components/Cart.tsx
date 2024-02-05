// Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectTotalPrice, incrementQuantity, decrementQuantity } from '../store/cartSlice'; // Import the incrementQuantity and decrementQuantity actions
import { RootState } from '../store/store';
import './Cart.scss'; // Import the Cart.scss file for styling
import './products.scss'; // Import the Cart.scss file for styling

const Cart: React.FC = () => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  const handleIncrementQuantity = (productId: string) => {
    dispatch(incrementQuantity(productId)); // Dispatch the incrementQuantity action with the product ID
  };

  const handleDecrementQuantity = (productId: string) => {
    dispatch(decrementQuantity(productId)); // Dispatch the decrementQuantity action with the product ID
  };

  return (
    <div className="cart cart--right"> {/* Add the cart--right class for positioning */}
      <h2>Shopping Cart</h2>
      {/* Display cart items */}
      {cartItems.map((item) => (
        <div key={item.productId}>
          <p>{item.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price * item.quantity}</p>
          {/* Buttons to increment and decrement quantity */}
          <button className="cart-button" onClick={() => handleIncrementQuantity(item.productId)}>+</button>
          <button className="cart-button" onClick={() => handleDecrementQuantity(item.productId)}>-</button>
        </div>
      ))}
      {/* Display total price */}
      <p>Total: ${totalPrice}</p>
      <button className="buy-button">Buy</button>
    </div>
  );
};

export default Cart;

