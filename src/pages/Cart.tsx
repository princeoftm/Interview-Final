import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { state, dispatch } = useCart(); // Access the cart context
  const navigate = useNavigate(); // Hook to navigate between pages

  const handleRemoveFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', id }); // Dispatch action to remove product from cart
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {state.cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {state.cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.imageUrl} alt={product.productName} />
              <h2>{product.productName}</h2>
              <p>{product.description}</p>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
            </div>
          ))}
          <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button> {/* Checkout Button */}
        </div>
      )}
    </div>
  );
};

export default Cart;
