export const FETCH_ABBONAMENTI_SUCCESS = "FETCH_ABBONAMENTI_SUCCESS";
export const FETCH_ABBONAMENTI_FAILURE = "FETCH_ABBONAMENTI_FAILURE";

export const CREA_ABBONAMENTO = "CREA_ABBONAMENTO";
export const CREA_ABBONAMENTO_SUCCESS = "CREA_ABBONAMENTO_SUCCESS";
export const CREA_ABBONAMENTO_FAILURE = "CREA_ABBONAMENTO_FAILURE";

export const fetchAbbonamentiSuccess = (abbonamenti) => ({
  type: FETCH_ABBONAMENTI_SUCCESS,
  payload: abbonamenti,
});

export const fetchAbbonamentiFailure = (error) => ({
  type: FETCH_ABBONAMENTI_FAILURE,
  payload: { error },
});

export const fetchAbbonamenti = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:3001/abbonamenti", {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      dispatch(fetchAbbonamentiSuccess(data.content));
    } catch (err) {
      dispatch(fetchAbbonamentiFailure(err.message));
    }
  };
};

export const creaAbbonamento = () => ({
  type: CREA_ABBONAMENTO,
});

export const creaAbbonamentoSuccess = (abbonamento) => ({
  type: CREA_ABBONAMENTO_SUCCESS,
  payload: abbonamento,
});
export const creaAbbonamentoFailure = (error) => ({
  type: CREA_ABBONAMENTO_FAILURE,
  payload: { error },
});

export const salvaAbbonamento = (abbonamentoData) => {
  return async (dispatch, getState) => {
    dispatch(creaAbbonamento());
    const { token } = getState().user;
    const utenteId = getState().user.userData.id;
    console.log("User ID:", utenteId);
    const dataOdierna = new Date().toISOString().split("T")[0];
    try {
      const res = await fetch("http://localhost:3001/abbonamenti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...abbonamentoData,
          utenteId,
          dataInizio: dataOdierna,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const nuovoAbbonamento = await res.json();
      dispatch(creaAbbonamentoSuccess(nuovoAbbonamento));
    } catch (err) {
      dispatch(creaAbbonamentoFailure(err.toString()));
    }
  };
};
