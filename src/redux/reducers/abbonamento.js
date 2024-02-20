import {
  FETCH_ABBONAMENTI_FAILURE,
  FETCH_ABBONAMENTI_SUCCESS,
} from "../actions/abbonamenti";

const initialState = {
  abbonamenti: [],
  error: null,
};

const abbonamentoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ABBONAMENTI_SUCCESS:
      return {
        ...state,
        abbonamenti: action.payload,
        error: null,
      };

    case FETCH_ABBONAMENTI_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default abbonamentoReducer;
