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
  uploadImageAction,
} from "../redux/actions/admin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AdminShop = () => {
  const dispatch = useDispatch();
  const { prodotti, loading, error, totalPages } = useSelector(
    (state) => state.admin
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editProdotto, setEditProdotto] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [prodottoToDelete, setProdottoToDelete] = useState(null);

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
        toast.success(
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
        toast.error(
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

  const handleDelete = (prodottoId) => {
    setProdottoToDelete(prodottoId);
    setShowDeleteConfirm(true);
  };
  const handleDeleteConfirmed = () => {
    if (prodottoToDelete) {
      dispatch(deleteProdotto(prodottoToDelete))
        .then(() => {
          toast.success("Prodotto eliminato con successo!");
          dispatch(fetchProdotti(currentPage));
          setShowDeleteConfirm(false);
        })
        .catch((error) => {
          console.error("Errore durante l'eliminazione del prodotto: ", error);
          toast.error("Si è verificato un errore durante l'eliminazione!");
        });
    }
    setProdottoToDelete(null);
  };

  const handleImageUpload = (prodottoId) => {
    // Mostra un input file all'utente
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", "image/*");
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Dispatch dell'azione Redux per caricare l'immagine
        dispatch(uploadImageAction(prodottoId, file));
      }
    };
    fileInput.click();
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        margin-top="100px"
      />
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
                      <button
                        className="admin-btn"
                        onClick={() => handleImageUpload(prodotto.id)}
                      >
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
          <Modal
            show={showDeleteConfirm}
            onHide={() => setShowDeleteConfirm(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Conferma Eliminazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Sei sicuro di voler eliminare questo prodotto?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Annulla
              </Button>
              <Button variant="primary" onClick={handleDeleteConfirmed}>
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

export default AdminShop;
