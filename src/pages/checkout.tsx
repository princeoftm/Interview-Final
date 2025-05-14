import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { app } from './config/config'; // Firebase config

const Checkout = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const db = getFirestore(app); // Initialize Firestore instance

  const calculateTotal = () => {
    return state.cart.reduce((total, product) => total + Number(product.price), 0);
  };

  const handleProceed = async () => {
    try {
      // Loop through all products in cart and delete from Firestore
      const deletePromises = state.cart.map(async (product) => {
        const productRef = doc(db, "products", product.id); // Assuming collection is 'cart' and each product has an `id`
        await deleteDoc(productRef);
      });

      await Promise.all(deletePromises);

      // Optionally clear the cart in the local/global state
      dispatch({ type: "CLEAR_CART" });

      alert("Checkout complete. Items removed from the database.");
      navigate("/"); // Navigate to the home page or a success page
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred while processing your checkout.");
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-header">Checkout</h1>
      {state.cart.length === 0 ? (
        <p>Your cart is empty. Add items to the cart to proceed with checkout.</p>
      ) : (
        <div>
          {state.cart.map((product) => (
            <div key={product.id} className="checkout-item">
              <img src={product.imageUrl} alt={product.productName} />
              <div>
                <h2>{product.productName}</h2>
                <p>{product.description}</p>
                <p>Price: ₹{product.price}</p>
              </div>
            </div>
          ))}
          <div className="checkout-total">Total: ₹{calculateTotal()}</div>
          <button className="proceed-button" onClick={handleProceed}>
            Proceed to Checkout and Delete from Database
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
