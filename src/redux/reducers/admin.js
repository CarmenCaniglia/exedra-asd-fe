import {
  DELETE_UTENTE,
  DELETE_UTENTE_FAILURE,
  DELETE_UTENTE_SUCCESS,
  FETCH_UTENTI,
  FETCH_UTENTI_FAILURE,
  FETCH_UTENTI_SUCCESS,
  UPDATE_UTENTE,
  UPDATE_UTENTE_FAILURE,
  UPDATE_UTENTE_SUCCESS,
} from "../actions/admin";

const initialState = {
  utenti: [],
  loading: false,
  error: null,
  totalPages: 0,
  updateLoading: false,
  updateError: null,
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

    case UPDATE_UTENTE:
      return {
        ...state,
        updateLoading: true,
        updateError: null,
      };
    case UPDATE_UTENTE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
      };

    case UPDATE_UTENTE_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload,
      };

    case DELETE_UTENTE:
      return {
        ...state,
        loading: true,
      };

    case DELETE_UTENTE_SUCCESS:
      return {
        ...state,
        utenti: state.utenti.filter((utente) => utente.id !== action.payload),
        loading: false,
      };

    case DELETE_UTENTE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default adminReducer;
