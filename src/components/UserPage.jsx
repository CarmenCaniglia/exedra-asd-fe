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
        <div className="user-card">
          <img src={userData.avatar} alt="Avatar dell'utente" />
          <div className="user-card-details">
            <p>Nome: {userData.nome}</p>
            <p>Cognome: {userData.cognome}</p>
            <p>Email: {userData.email}</p>
          </div>
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default UserPage;
