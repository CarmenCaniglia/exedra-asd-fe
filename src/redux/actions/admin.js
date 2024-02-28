export const FETCH_UTENTI = "FETCH_UTENTI";
export const FETCH_UTENTI_SUCCESS = "FETCH_UTENTI_SUCCESS";
export const FETCH_UTENTI_FAILURE = "FETCH_UTENTI_FAILURE";
export const UPDATE_UTENTE = "UPDATE_UTENTE";
export const UPDATE_UTENTE_SUCCESS = "UPDATE_UTENTE_SUCCESS";
export const UPDATE_UTENTE_FAILURE = "UPDATE_UTENTE_FAILURE";
export const DELETE_UTENTE = "DELETE_UTENTE";
export const DELETE_UTENTE_SUCCESS = "DELETE_UTENTE_SUCCESS";
export const DELETE_UTENTE_FAILURE = "DELETE_UTENTE_FAILURE";
// GESTIONE ABBONAMENTI
export const FETCH_ADMIN_ABBONAMENTI = "FETCH_ADMIN_ABBONAMENTI";
export const FETCH_ADMIN_ABBONAMENTI_SUCCESS =
  "FETCH_ADMIN_ABBONAMENTI_SUCCESS";
export const FETCH_ADMIN_ABBONAMENTI_FAILURE = "FETCH_ABBONAMENTI_FAILURE";
export const UPDATE_ADMIN_ABBONAMENTO = "UPDATE_ADMIN_ABBONAMENTO";
export const UPDATE_ADMIN_ABBONAMENTO_SUCCESS =
  "UPDATE_ADMIN_ABBONAMENTO_SUCCESS";
export const UPDATE_ADMIN_ABBONAMENTO_FAILURE =
  "UPDATE_ADMIN_ABBONAMENTO_FAILURE";
// GESTIONE CORSI
export const FETCH_ADMIN_CORSI = "FETCH_ADMIN_CORSI";
export const FETCH_ADMIN_CORSI_SUCCESS = "FETCH_ADMIN_CORSI_SUCCESS";
export const FETCH_ADMIN_CORSI_FAILURE = "FETCH_ADMIN_CORSI_FAILURE";

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

export const deleteUtente = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_UTENTE });
  try {
    const token = getState().user.token;
    const res = await fetch(`http://localhost:3001/utenti/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Errore della cancellazione dell'utente!");
    }
    dispatch({
      type: DELETE_UTENTE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_UTENTE_FAILURE,
      payload: error.message,
    });
  }
};
// gestione abbonamenti

export const fetchAdminAbbonamenti =
  (page = 0, size = 10, orderBy = "id") =>
  async (dispatch, getState) => {
    dispatch({ type: FETCH_ADMIN_ABBONAMENTI });
    try {
      const token = getState().user.token;
      const res = await fetch(
        `http://localhost:3001/abbonamenti?page=${page}&size=${size}&orderBy=${orderBy}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Errore nel recupero degli abbonamenti");
      }
      const data = await res.json();
      dispatch({ type: FETCH_ADMIN_ABBONAMENTI_SUCCESS, payload: data });
      console.log(data);
    } catch (error) {
      dispatch({
        type: FETCH_ADMIN_ABBONAMENTI_FAILURE,
        payload: error.message,
      });
    }
  };

export const updateAdminAbbonamento =
  (id, abbonamentoData, utenteId) => async (dispatch, getState) => {
    console.log("ID before dispatch:", id);
    dispatch({ type: UPDATE_ADMIN_ABBONAMENTO });
    const requestBody = {
      ...abbonamentoData,
      utenteId: utenteId,
    };
    try {
      const token = getState().user.token;
      const res = await fetch(`http://localhost:3001/abbonamenti/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error(
          "Errore nell'aggiornamento:",
          errorData.message || "Errore sconosciuto"
        );
        throw new Error(
          errorData.message ||
            "Errore nell'aggiornamento dei dati dell'abbonamento!"
        );
      }
      const updatedAbbonamento = await res.json();
      console.log("Updated abbonamento:", updatedAbbonamento);
      dispatch({
        type: UPDATE_ADMIN_ABBONAMENTO_SUCCESS,
        payload: updatedAbbonamento,
      });
      console.log(updatedAbbonamento);
    } catch (error) {
      dispatch({
        type: UPDATE_ADMIN_ABBONAMENTO_FAILURE,
        payload: error.message,
      });
    }
  };

// gestione corsi
export const fetchCorsi = () => {
  return async (dispatch, getState) => {
    dispatch({ type: FETCH_ADMIN_CORSI });
    try {
      const token = getState().user.token;
      const res = await fetch(`http://localhost:3001/corsi?size=1000`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Errore nel recupero dei corsi!");
      }
      const data = await res.json();

      dispatch({
        type: FETCH_ADMIN_CORSI_SUCCESS,
        payload: { corsi: data.content },
      });
    } catch (error) {
      dispatch({
        type: FETCH_ADMIN_CORSI_FAILURE,
        payload: error.message,
      });
    }
  };
};
