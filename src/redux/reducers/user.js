import {
  FETCH_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPLOAD_USER_IMAGE_SUCCESS,
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
        userData: null,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    case UPLOAD_USER_IMAGE_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          avatar: action.payload,
        },
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null,
      };

    case UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
