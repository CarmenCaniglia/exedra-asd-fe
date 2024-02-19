import { GET_PRODOTTI } from "../actions";

const initialState = {
  stock: [],
};

const prodottoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODOTTI:
      return {
        ...state,
        stock: action.payload.content,
      };

    default:
      return state;
  }
};

export default prodottoReducer;
