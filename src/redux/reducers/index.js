import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions";

const initialState = {
  cart: {
    content: [],
  },
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          content: [...state.cart.content, action.payload],
        },
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          content: state.cart.content.filter(
            (prodotto, i) => i !== action.payload
          ),
          // content: [
          //   ...state.cart.content.slice(0, action.payload),
          //   ...state.cart.content.slice(
          //     action.payload + 1,
          //     state.cart.content.length //posso ometterlo
          //   ),
          // ],
        },
      };

    default:
      return state;
  }
};

export default shopReducer;
