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
  createProdotto,
  deleteProdotto,
  fetchProdotti,
  updateProdotto,
} from "../redux/actions/admin";

const AdminShop = () => {
  const dispatch = useDispatch();
  const { prodotti, loading, error, totalPages } = useSelector(
    (state) => state.admin
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editProdotto, setEditProdotto] = useState(null);

  useEffect(() => {
    dispatch(fetchProdotti(currentPage));
  }, [dispatch, currentPage]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (prodotto) => {
    setEditProdotto(prodotto);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editProdotto.id
      ? updateProdotto(editProdotto)
      : createProdotto(editProdotto);

    dispatch(action)
      .then(() => {
        dispatch(fetchProdotti(currentPage));
        setShowModal(false);
        alert(
          editProdotto.id
            ? "Prodotto aggiornato con successo!"
            : "Prodotto creato con successo!"
        );
      })
      .catch((error) => {
        console.error(
          "Errore durante la creazione/aggiornamento del prodotto: ",
          error
        );
        alert(
          "Si è verificato un errore durante la creazione/aggiornamento del prodotto!"
        );
      });
  };

  const handleCreate = () => {
    setEditProdotto({
      nome: "",
      descrizione: "",
      prezzo: "",
      categoria: "",
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Sei sicuro di voler eliminare questo prodotto?"
    );
    if (isConfirmed) {
      dispatch(deleteProdotto(id))
        .then(() => {
          alert("Prodotto eliminato con successo!");
          dispatch(fetchProdotti()); // Rifetch l'elenco dei prodotti dopo l'eliminazione
        })
        .catch((error) => {
          console.error("Errore durante l'eliminazione del prodotto:", error);
          alert("Si è verificato un errore durante l'eliminazione!");
        });
    }
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
    <Container>
      <Row>
        <Col>
          <div className="d-flex align-items-baseline mb-4">
            <h2>Gestione Prodotti</h2>
            <button className="admin-btn" onClick={handleCreate}>
              <i className="bi bi-plus-circle-fill"></i>
            </button>
          </div>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th className="titolo-tab">Id</th>
                <th className="titolo-tab nome-col">Nome</th>
                <th className="titolo-tab">Categoria</th>
                <th className="titolo-tab">Descrizione</th>
                <th className="titolo-tab">Prezzo</th>
                <th className="titolo-tab">Immagine</th>
                <th className="titolo-tab">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(prodotti) &&
                prodotti.map((prodotto, index) => (
                  <tr key={index}>
                    <td>{prodotto.id}</td>
                    <td>{prodotto.nome}</td>
                    <td>{prodotto.categoria}</td>
                    <td className="descrizione">{prodotto.descrizione}</td>
                    <td>{prodotto.prezzo}</td>
                    <td className="descrizione">{prodotto.image}</td>
                    <td>
                      <button className="admin-btn">
                        <i className="bi bi-file-image"></i>
                      </button>
                      <button
                        className="admin-btn"
                        onClick={() => handleEditClick(prodotto)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="admin-btn"
                        onClick={() => handleDelete(prodotto.id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editProdotto?.id ? "Modifica Prodotto" : "Aggiungi Prodotto"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {editProdotto && (
                <Form>
                  <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nome del prodotto"
                      value={editProdotto.nome}
                      onChange={(e) =>
                        setEditProdotto({
                          ...editProdotto,
                          nome: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select
                      value={editProdotto.categoria}
                      onChange={(e) =>
                        setEditProdotto({
                          ...editProdotto,
                          categoria: e.target.value,
                        })
                      }
                    >
                      <option value="">Seleziona una categoria</option>
                      <option value="INTEGRATORI">Integratori</option>
                      <option value="ABBIGLIAMENTO">Abbigliamento</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Descrizione</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Descrizione del prodotto"
                      value={editProdotto.descrizione}
                      onChange={(e) =>
                        setEditProdotto({
                          ...editProdotto,
                          descrizione: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Prezzo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Prezzo del prodotto"
                      value={editProdotto.prezzo}
                      onChange={(e) =>
                        setEditProdotto({
                          ...editProdotto,
                          prezzo: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  {/* Ripeti per ogni campo necessario */}
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Chiudi
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Salva Cambiamenti
              </Button>
            </Modal.Footer>
          </Modal>
          <Pagination className="custom-pagination">{items}</Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminShop;
