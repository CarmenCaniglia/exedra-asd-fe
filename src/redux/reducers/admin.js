import {
  FETCH_UTENTI,
  FETCH_UTENTI_FAILURE,
  FETCH_UTENTI_SUCCESS,
} from "../actions/admin";

const initialState = {
  utenti: [],
  loading: false,
  error: null,
  totalPages: 0,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UTENTI:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_UTENTI_SUCCESS:
      return {
        ...state,
        utenti: action.payload.utenti,
        totalPages: action.payload.totalPages,
        loading: false,
      };

    case FETCH_UTENTI_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
