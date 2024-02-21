import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/actions";

const UserPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div className="user-page">
      <h1>Pagina Utente</h1>
      {userData ? (
        <>
          <div className="user-card">
            <img src={userData.avatar} alt="Avatar dell'utente" />
            <div className="user-card-details">
              <p>Nome: {userData.nome}</p>
              <p>Cognome: {userData.cognome}</p>
              <p>Email: {userData.email}</p>
            </div>
          </div>
          {userData.abbonamento && (
            <div className="abbonamento-details">
              <h3>Dettagli Abbonamento</h3>
              <p>ID: {userData.abbonamento.id}</p>
              <p>Tipo: {userData.abbonamento.tipoAbbonamento}</p>
              <p>Prezzo: {userData.abbonamento.prezzo}</p>
              <p>Data Inizio: {userData.abbonamento.dataInizio}</p>
              <p>Data Fine: {userData.abbonamento.dataFine}</p>
              <p>Descrizione: {userData.abbonamento.descrizione || "N/A"}</p>
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
