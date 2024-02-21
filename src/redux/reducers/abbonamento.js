import {
  CREA_ABBONAMENTO,
  CREA_ABBONAMENTO_FAILURE,
  CREA_ABBONAMENTO_SUCCESS,
  FETCH_ABBONAMENTI_FAILURE,
  FETCH_ABBONAMENTI_SUCCESS,
} from "../actions/abbonamenti";

const initialState = {
  abbonamenti: [],
  loading: false,
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

    case CREA_ABBONAMENTO:
      return {
        ...state,
        loading: false,
      };
    case CREA_ABBONAMENTO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CREA_ABBONAMENTO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default abbonamentoReducer;
