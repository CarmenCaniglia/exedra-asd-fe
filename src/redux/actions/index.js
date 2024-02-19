export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const GET_PRODOTTI = "GET_PRODOTTI";

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

export const getProdottiAction = () => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/prodotti", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNzA4MzMzNDk4LCJleHAiOjE3MDg5MzgyOTh9.wAay29oYqaotKgZ28boGxsh04zIe3bKGD9TW2j2prgU", // Add your token here
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const data = await resp.json();
      dispatch({
        type: GET_PRODOTTI,
        payload: data,
      });
    } catch (err) {
      console.error("Non è possibile recuperare la lista dei prodotti:", err);
    }
  };
};
