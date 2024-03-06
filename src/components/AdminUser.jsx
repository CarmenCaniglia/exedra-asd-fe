import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUtente,
  fetchUtenti,
  updateUtente,
} from "../redux/actions/admin";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AdminUser = () => {
  const dispatch = useDispatch();
  const { utenti, loading, error, totalPages } = useSelector(
    (state) => state.admin
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleShowDeleteConfirm = (utenteId) => {
    setUserToDelete(utenteId);
    setShowDeleteConfirm(true);
  };

  useEffect(() => {
    dispatch(fetchUtenti(currentPage));
  }, [dispatch, currentPage]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage + 1}
        onClick={() => handlePageClick(number - 1)}
        className="custom-pagination"
      >
        {number}
      </Pagination.Item>
    );
  }

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;

  const handleOpenModal = (utente) => {
    setSelectedUser(utente);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSubmit = () => {
    dispatch(updateUtente(selectedUser.id, selectedUser))
      .then(() => {
        dispatch(fetchUtenti(currentPage)); // Rifetch dopo l'update
        handleCloseModal();
        toast.success("Utente aggiornato con successo!");
      })
      .catch((error) => {
        console.error("Errore nell'aggiornamento dell'utente:", error);
        toast.error(
          "Si è verificato un errore durante l'aggiornamento dell'utente!"
        );
      });
  };

  const handleDelete = () => {
    if (userToDelete) {
      dispatch(deleteUtente(userToDelete))
        .then(() => {
          toast.success("Utente eliminato con successo!");
          dispatch(fetchUtenti(currentPage));
          setShowDeleteConfirm(false);
          setUserToDelete(null);
        })
        .catch((error) => {
          console.error("Errore durante l'eliminazione dell'utente: ", error);
          toast.error(
            "Si è verificato un errore durante l'eliminazione dell'utente!"
          );
        });
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Row>
        <Col>
          <h2 className="titolo-shop mb-4">Gestione Utenti</h2>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th className="titolo-tab">ID</th>
                <th className="titolo-tab">Nome</th>
                <th className="titolo-tab">Cognome</th>
                <th className="titolo-tab">Email</th>
                <th className="titolo-tab">Ruolo</th>
                <th className="titolo-tab">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(utenti) &&
                utenti.map((utente) => (
                  <tr key={utente.id}>
                    <td>{utente.id}</td>
                    <td>{utente.nome}</td>
                    <td>{utente.cognome}</td>
                    <td>{utente.email}</td>
                    <td>{utente.role}</td>
                    <td>
                      <button
                        className="admin-btn"
                        onClick={() => handleOpenModal(utente)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="admin-btn"
                        onClick={() => handleShowDeleteConfirm(utente.id)}
                      >
                        <i className=" bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Modifica Utente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={selectedUser?.nome}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, nome: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={selectedUser?.cognome}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        cognome: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue={selectedUser?.email}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ruolo</Form.Label>
                  <Form.Select
                    defaultValue={selectedUser?.role}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, role: e.target.value })
                    }
                  >
                    <option>ADMIN</option>
                    <option>USER</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Chiudi
              </Button>
              <Button variant="primary" onClick={() => handleSubmit()}>
                Salva Modifiche
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showDeleteConfirm}
            onHide={() => setShowDeleteConfirm(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Conferma Eliminazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Sei sicuro di voler eliminare questo utente?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Annulla
              </Button>
              <Button variant="primary" onClick={handleDelete}>
                Elimina
              </Button>
            </Modal.Footer>
          </Modal>

          <Pagination className="custom-pagination">{items}</Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminUser;
