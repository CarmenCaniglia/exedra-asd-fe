export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const addToCartAction = (prodottoSelected) => {
  return {
    type: ADD_TO_CART,
    payload: prodottoSelected,
  };
};

export const removeFromCartAction = (i) => {
  return {
    type: REMOVE_FROM_CART,
    payload: i,
  };
};

export const loginSuccessAction = (token, role) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { token, role },
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};

export const loginFailureAction = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: { error },
  };
};
