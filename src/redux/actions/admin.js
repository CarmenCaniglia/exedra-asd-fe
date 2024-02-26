export const FETCH_UTENTI = "FETCH_UTENTI";
export const FETCH_UTENTI_SUCCESS = "FETCH_UTENTI_SUCCESS";
export const FETCH_UTENTI_FAILURE = "FETCH_UTENTI_FAILURE";

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
