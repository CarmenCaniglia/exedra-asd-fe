import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, uploadUserImage } from "../redux/actions";

const UserPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && userData && userData.id) {
      dispatch(uploadUserImage(userData.id, file));
    }
  };

  return (
    <div className="user-page">
      {userData ? (
        <>
          <h1>Ciao {userData.nome}</h1>
          <div className="user-card">
            <img src={userData.avatar} alt="Avatar dell'utente" />
            <input type="file" onChange={handleImageUpload} />
            <div className="user-card-details">
              <p>Nome: {userData.nome}</p>
              <p>Cognome: {userData.cognome}</p>
              <p>Email: {userData.email}</p>
            </div>
          </div>
          {userData.abbonamento && (
            <div className="abbonamento-details">
              <h3>Dettagli Abbonamento</h3>
              <p>
                Tipologia Abbonamento: {userData.abbonamento.tipoAbbonamento}
              </p>
              <p>Prezzo: {userData.abbonamento.prezzo} €</p>
              <p>Data Inizio: {userData.abbonamento.dataInizio}</p>
              <p>Data Fine: {userData.abbonamento.dataFine}</p>
            </div>
          )}
        </>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default UserPage;
