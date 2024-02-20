export const FETCH_ABBONAMENTI_SUCCESS = "FETCH_ABBONAMENTI_SUCCESS";
export const FETCH_ABBONAMENTI_FAILURE = "FETCH_ABBONAMENTI_FAILURE";

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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNzA4NDUzMTg4LCJleHAiOjE3MDkwNTc5ODh9.wDY_KQsORxGqeDeg-O7VJ0EYg2EurOWjezfa3V9YBYU",
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
