import { deleteDoc, doc } from 'firebase/firestore'; // Firestore functions
import { db } from './config/config'; // Firebase config

/**
 * Function to delete a product from Firestore.
 * @param {string} productId - The ID of the product to delete.
 * @returns {Promise<void>}
 */
const deleteProduct = async (productId: string): Promise<void> => {
  try {
    // Delete the product document from Firestore
    await deleteDoc(doc(db, 'products', productId));
    console.log(`Product with ID ${productId} deleted successfully`);
  } catch (err) {
    console.error('Error deleting product:', err);
  }
};

export default deleteProduct;
