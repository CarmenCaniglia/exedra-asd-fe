import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminAbbonamenti,
  updateAdminAbbonamento,
} from "../redux/actions/admin";

const AdminAbbonamenti = () => {
  const dispatch = useDispatch();
  const { abbonamenti, loading, error, totalPages } = useSelector(
    (state) => state.admin
  );
  const userDetails = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedAbbonamento, setSelectedAbbonamento] = useState({});

  useEffect(() => {
    dispatch(fetchAdminAbbonamenti(currentPage));
  }, [dispatch, currentPage]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenModal = (abbonamento) => {
    setSelectedAbbonamento({
      ...abbonamento,
      utenteId: userDetails.id, // Assumendo che ogni abbonamento debba essere associato all'utente corrente
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAbbonamento({});
  };

  const handleSaveChanges = () => {
    dispatch(
      updateAdminAbbonamento(selectedAbbonamento.id, selectedAbbonamento)
    );
    handleCloseModal();
  };

  const handleFormChange = (e) => {
    setSelectedAbbonamento({
      ...selectedAbbonamento,
      utenteId: userDetails.id,
      [e.target.name]: e.target.value,
    });
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

  return (
    <Container fluid>
      <h2 className="titolo-shop mb-4">Gestione Abbonamenti</h2>
      <Row>
        <Col>
          <Table striped bordered responsive className="tabella-corsi">
            <thead>
              <tr>
                <th className="titolo-tab">ID</th>
                <th className="titolo-tab">Tipo Abbonamento</th>
                <th className="titolo-tab">Descrizione</th>
                <th className="titolo-tab">Prezzo</th>
                <th className="titolo-tab">Durata</th>
                <th className="titolo-tab">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(abbonamenti) &&
                abbonamenti.map((abbonamento) => (
                  <tr key={abbonamento.id}>
                    <td>{abbonamento.id}</td>
                    <td>{abbonamento.tipoAbbonamento}</td>
                    <td>{abbonamento.descrizione}</td>
                    <td>{abbonamento.prezzo}€</td>
                    <td>
                      dal {abbonamento.dataInizio} al {abbonamento.dataFine}
                    </td>
                    <td>
                      <button
                        className="admin-btn"
                        onClick={() => handleOpenModal(abbonamento)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="admin-btn">
                        <i className=" bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Pagination className="custom-pagination">{items}</Pagination>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Abbonamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                name="tipoAbbonamento"
                value={selectedAbbonamento.tipoAbbonamento || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                type="text"
                name="descrizione"
                value={selectedAbbonamento.descrizione || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data Inizio</Form.Label>
              <Form.Control
                type="date"
                name="dataInizio"
                value={selectedAbbonamento.dataInizio || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                type="number"
                name="prezzo"
                value={selectedAbbonamento.prezzo || ""}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminAbbonamenti;
