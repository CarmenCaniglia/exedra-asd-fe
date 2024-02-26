export const FETCH_UTENTI = "FETCH_UTENTI";
export const FETCH_UTENTI_SUCCESS = "FETCH_UTENTI_SUCCESS";
export const FETCH_UTENTI_FAILURE = "FETCH_UTENTI_FAILURE";
export const UPDATE_UTENTE = "UPDATE_UTENTE";
export const UPDATE_UTENTE_SUCCESS = "UPDATE_UTENTE_SUCCESS";
export const UPDATE_UTENTE_FAILURE = "UPDATE_UTENTE_FAILURE";

export const fetchUtenti =
  (page = 0, size = 10) =>
  async (dispatch, getState) => {
    dispatch({ type: FETCH_UTENTI });

    try {
      const token = getState().user.token;
      const res = await fetch(
        `http://localhost:3001/utenti?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Errore nella richiesta!");
      }

      const data = await res.json();
      dispatch({
        type: FETCH_UTENTI_SUCCESS,
        payload: { utenti: data.content, totalPages: data.totalPages },
      });
    } catch (error) {
      dispatch({
        type: FETCH_UTENTI_FAILURE,
        error: error.message,
      });
    }
  };

export const updateUtente = (id, utenteData) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_UTENTE });
  try {
    const token = getState().user.token; // Assicurati di avere accesso al token come necessario
    const response = await fetch(`http://localhost:3001/utenti/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(utenteData),
    });

    if (!response.ok) {
      throw new Error("Errore nella richiesta di aggiornamento");
    }

    const updatedUtente = await response.json();

    dispatch({
      type: UPDATE_UTENTE_SUCCESS,
      payload: updatedUtente,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_UTENTE_FAILURE,
      payload: error.message,
    });
  }
};
