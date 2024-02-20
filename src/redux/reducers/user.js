import {
  FETCH_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions";

const initialState = {
  token: "",
  role: "",
  userData: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        error: null,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        token: null,
        role: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default userReducer;