import {
  CREATE_CORSO_SUCCESS,
  CREATE_PRODOTTO,
  CREATE_PRODOTTO_FAILURE,
  CREATE_PRODOTTO_SUCCESS,
  DELETE_PRODOTTO,
  DELETE_PRODOTTO_FAILURE,
  DELETE_PRODOTTO_SUCCESS,
  DELETE_UTENTE,
  DELETE_UTENTE_FAILURE,
  DELETE_UTENTE_SUCCESS,
  FETCH_ADMIN_ABBONAMENTI,
  FETCH_ADMIN_ABBONAMENTI_FAILURE,
  FETCH_ADMIN_ABBONAMENTI_SUCCESS,
  FETCH_ADMIN_CORSI,
  FETCH_ADMIN_CORSI_FAILURE,
  FETCH_ADMIN_CORSI_SUCCESS,
  FETCH_PRODOTTI,
  FETCH_PRODOTTI_FAILURE,
  FETCH_PRODOTTI_SUCCESS,
  FETCH_UTENTI,
  FETCH_UTENTI_FAILURE,
  FETCH_UTENTI_SUCCESS,
  UPDATE_ADMIN_ABBONAMENTO,
  UPDATE_ADMIN_ABBONAMENTO_FAILURE,
  UPDATE_ADMIN_ABBONAMENTO_SUCCESS,
  UPDATE_CORSO,
  UPDATE_CORSO_FAILURE,
  UPDATE_CORSO_SUCCESS,
  UPDATE_PRODOTTO,
  UPDATE_PRODOTTO_FAILURE,
  UPDATE_PRODOTTO_SUCCESS,
  UPDATE_UTENTE,
  UPDATE_UTENTE_FAILURE,
  UPDATE_UTENTE_SUCCESS,
} from "../actions/admin";

const initialState = {
  utenti: [],
  abbonamenti: [],
  corsi: [],
  prodotti: [],
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

    // Abbonamenti
    case FETCH_ADMIN_ABBONAMENTI:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ADMIN_ABBONAMENTI_SUCCESS:
      return {
        ...state,
        abbonamenti: action.payload.content,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    case FETCH_ADMIN_ABBONAMENTI_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ADMIN_ABBONAMENTO:
      return { ...state, loading: true };

    case UPDATE_ADMIN_ABBONAMENTO_SUCCESS:
      console.log("Payload:", action.payload); // Correzione: Aggiorna l'abbonamento modificato nell'array di abbonamenti qui
      {
        const updatedAbbonamenti = state.abbonamenti.map((abbonamento) =>
          abbonamento.id === action.payload.id ? action.payload : abbonamento
        );
        return { ...state, loading: false, abbonamenti: updatedAbbonamenti };
      }

    case UPDATE_ADMIN_ABBONAMENTO_FAILURE:
      return { ...state, loading: false, error: action.payload };

    //corsi

    case FETCH_ADMIN_CORSI:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ADMIN_CORSI_SUCCESS:
      return {
        ...state,
        loading: false,
        corsi: action.payload.corsi,
      };
    case FETCH_ADMIN_CORSI_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_CORSO:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_CORSO_SUCCESS:
      return {
        ...state,
        corsi: state.corsi.filter((corso) => corso.id !== action.payload),
        loading: false,
      };
    case UPDATE_CORSO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_CORSO_SUCCESS:
      return {
        ...state,
        corsi: [...state.corsi, action.payload],
        loading: false,
        error: null,
      };
    case "DELETE_CORSO_SUCCESS":
      return {
        ...state,
        corsi: state.corsi.filter((corso) => corso.id !== action.payload),
      };

    // shop
    case FETCH_PRODOTTI:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PRODOTTI_SUCCESS:
      return {
        ...state,
        loading: false,
        prodotti: action.payload.prodotti,
        totalPages: action.payload.totalPages,
      };
    case FETCH_PRODOTTI_FAILURE:
      return {
        ...state,
        loading: false,
        prodotti: [],
        error: action.payload,
      };

    case UPDATE_PRODOTTO:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_PRODOTTO_SUCCESS:
      return {
        ...state,
        loading: false,
        prodotti: state.prodotti.filter(
          (prodotto) => prodotto.id !== action.payload
        ),
        error: null,
      };

    case UPDATE_PRODOTTO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_PRODOTTO:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODOTTO_SUCCESS:
      return {
        ...state,
        loading: false,
        prodotti: [...state.prodotti, action.payload],
      };

    case CREATE_PRODOTTO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PRODOTTO:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODOTTO_SUCCESS:
      return {
        ...state,
        loading: false,
        prodotti: state.prodotti.filter(
          (prodotto) => prodotto.id !== action.payload
        ),
      };
    case DELETE_PRODOTTO_FAILURE:
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
