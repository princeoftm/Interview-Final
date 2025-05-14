import React, { createContext, useContext, useReducer } from 'react';

// Define the type for a Product
interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Define the type for the cart state
interface CartState {
  cart: Product[];
}

// Define the actions for the reducer
type Action =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; id: string }
  | { type: 'CLEAR_CART' };

// Initial cart state
const initialState: CartState = {
  cart: [],
};

// Create a reducer function
const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { cart: [...state.cart, action.product] };
    case 'REMOVE_FROM_CART':
      return { cart: state.cart.filter((product) => product.id !== action.id) };
    case 'CLEAR_CART':
      return { cart: [] };
    default:
      return state;
  }
};

// Create the Cart context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Create a custom provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a hook to use the Cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
