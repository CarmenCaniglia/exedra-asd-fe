import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUtenti, updateUtente } from "../redux/actions/admin";
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

const AdminUser = () => {
  const dispatch = useDispatch();
  const { utenti, loading, error, totalPages } = useSelector(
    (state) => state.admin
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
      })
      .catch((error) => {
        console.error("Errore nell'aggiornamento dell'utente:", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Gestione Utenti</h2>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Cognome</th>
                <th>Email</th>
                <th>Ruolo</th>
                <th>Azioni</th>
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
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ marginRight: "5px" }}
                        onClick={() => handleOpenModal(utente)}
                      >
                        Modifica
                      </Button>
                      <Button variant="danger" size="sm">
                        Elimina
                      </Button>
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
              <Button
                variant="primary"
                onClick={() => handleSubmit(selectedUser)}
              >
                Salva Modifiche
              </Button>
            </Modal.Footer>
          </Modal>

          <Pagination>{items}</Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminUser;
