import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUserData,
  updateUser,
  uploadUserImage,
  logoutAction,
} from "../redux/actions";
import { Form, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    // Quando carichi i dati dell'utente, imposta solo i campi che l'utente può modificare
    if (userData) {
      setForm({
        nome: userData.nome || "",
        cognome: userData.cognome || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && userData && userData.id) {
      dispatch(uploadUserImage(userData.id, file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      role: userData.role,
      password: userData.password,
    };
    dispatch(updateUser(payload))
      .then(() => {
        dispatch(fetchUserData()); // Ri-fetch dei dati dell'utente
        handleClose();
        alert("Dati aggiornati con successo!");
      })
      .catch((error) => {
        console.error("Errore nell'aggiornamento dei dati utente: ", error);
        alert("Si è verificato un errore durante l'aggiornamento dei dati!");
      });
  };
  const handleDeleteUser = () => {
    const isConfirmed = window.confirm(
      "Sei sicuro di voler eliminare il tuo account? Non potrai più tornare indietro!"
    );
    if (isConfirmed) {
      dispatch(deleteUser())
        .then(() => {
          dispatch(logoutAction());
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.error("Errore durante l'eliminzaione dell'account: ", err);
        });
    }
  };

  return (
    <div className="user-page mt-4">
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
              <div>
                <Button variant="primary" onClick={handleShow}>
                  Modifica Profilo
                </Button>
                <Button variant="danger" onClick={handleDeleteUser}>
                  Elimina Account
                </Button>
              </div>
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

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                required
                value={form.nome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="cognome"
                required
                value={form.cognome}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="primary" type="submit">
              Salva Cambiamenti
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserPage;
