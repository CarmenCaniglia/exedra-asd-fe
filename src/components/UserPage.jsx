import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUserData,
  updateUser,
  uploadUserImage,
  logoutAction,
} from "../redux/actions";
import { Form, Modal, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const UserPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
  });

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
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
        toast.success("Dati aggiornati con successo!");
      })
      .catch((error) => {
        toast.error(
          "Si è verificato un errore durante l'aggiornamento dei dati: " +
            error.message
        );
      });
  };
  const handleDeleteUser = () => {
    dispatch(deleteUser())
      .then(() => {
        dispatch(logoutAction());
        navigate("/", { replace: true });
        setShowDeleteConfirm(false); // Chiudi il modal dopo l'eliminazione
      })
      .catch((err) => {
        toast.error(
          "Errore durante l'eliminazione dell'account: " + err.message
        );
        setShowDeleteConfirm(false); // Chiudi il modal in caso di errore
      });
  };

  return (
    <Container className="user-page">
      <ToastContainer position="top-center" autoClose={2000} />
      {userData ? (
        <>
          <Row className="justify-content-lg-center justify-content-md-between">
            <h1 className="titolo-shop ms-5">Ciao {userData.nome}</h1>
            <Col xs={12}>
              <div className="user-card d-flex flex-column align-items-center text-center p-4">
                <div className="position-relative user-image-container">
                  <img
                    src={userData.avatar}
                    alt="Avatar dell'utente"
                    className="user-image mb-2"
                  />
                  <label htmlFor="file-upload" className="i-label">
                    <i className="i-foto bi bi-plus-circle-fill"></i>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                <h3>
                  {userData.nome} {userData.cognome}
                </h3>
                <p>
                  <i className="email bi bi-envelope-open-heart me-1"></i>
                  {userData.email}
                </p>

                <div className="mt-2 d-flex">
                  <button onClick={handleShow} className="user-btn me-3">
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="user-btn"
                  >
                    <i className=" bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </Col>

            {userData.abbonamento && (
              <Col xs={12}>
                <div className="abb-card d-flex flex-column align-items-center text-center p-4">
                  <h3 className="dettagli">Dettagli Abbonamento</h3>
                  <p className="abbonamento-info">
                    Tipologia Abbonamento{" "}
                    <i className="email bi bi-check2-square"></i>:{" "}
                    {userData.abbonamento.tipoAbbonamento}
                  </p>
                  <p className="abbonamento-info">
                    Prezzo<i className="email bi bi-currency-euro"></i>:{" "}
                    {userData.abbonamento.prezzo}
                  </p>
                  <p className="abbonamento-info">
                    Data Inizio <i className="email bi bi-calendar2-heart"></i>:{" "}
                    {userData.abbonamento.dataInizio}
                  </p>
                  <p className="abbonamento-info">
                    Data Fine <i className="email bi bi-calendar-x"></i>:{" "}
                    {userData.abbonamento.dataFine}
                  </p>
                </div>
              </Col>
            )}
          </Row>
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
            <Button variant="secondary" className="mt-3" onClick={handleClose}>
              Chiudi
            </Button>
            <Button variant="primary" className="mt-3" type="submit">
              Salva Cambiamenti
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare il tuo account? Non potrai più tornare
          indietro!
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Annulla
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            Elimina Account
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserPage;
