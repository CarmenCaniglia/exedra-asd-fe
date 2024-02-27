export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const GET_PRODOTTI = "GET_PRODOTTI";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const UPLOAD_USER_IMAGE_SUCCESS = "UPLOAD_USER_IMAGE_SUCCESS";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

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
          Authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION_TOKEN}`,
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

export const fetchUserData = () => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    try {
      const response = await fetch("http://localhost:3001/utenti/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Errore nel fetch dei dati utente");
      const userData = await response.json();
      dispatch({
        type: "FETCH_USER_SUCCESS",
        payload: userData,
      });
    } catch (error) {
      console.error("Errore nel fetch dei dati utente:", error);
    }
  };
};

export const uploadUserImage = (userId, file) => {
  return async (dispatch, getState) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const token = getState().user.token;

    try {
      const response = await fetch(
        `http://localhost:3001/utenti/${userId}/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nel caricamento dell'immagine");
      }

      const imageUrl = await response.text();
      console.log("URL dell'immagine caricata:", imageUrl);
      dispatch({
        type: UPLOAD_USER_IMAGE_SUCCESS,
        payload: imageUrl,
      });
    } catch (error) {
      console.error("Errore:", error);
    }
  };
};

export const updateUser = (userData) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    try {
      const res = await fetch("http://localhost:3001/utenti/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        throw new Error("Errore nell'aggiornamento dell'utente!");
      }
      const updatedUserData = await res.json();
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: updatedUserData,
      });
    } catch (err) {
      console.error("Errore nell'aggiornamento dei dati utente: ", err);
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: err.message,
      });
    }
  };
};

export const deleteUser = () => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    try {
      const res = await fetch("http://localhost:3001/utenti/me", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Errore nell'eliminazione dell'utente!");
      }
      dispatch({
        type: DELETE_USER_SUCCESS,
      });
    } catch (err) {
      console.error("Errore nell'eliminazione dell'utente: ", err);
      dispatch({
        type: DELETE_USER_FAILURE,
        payload: err.message,
      });
    }
  };
};
