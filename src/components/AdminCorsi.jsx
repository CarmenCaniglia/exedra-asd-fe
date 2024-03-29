import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createCorso,
  deleteCorso,
  fetchCorsi,
  updateCorso,
} from "../redux/actions/admin";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AdminCorsi = () => {
  const dispatch = useDispatch();
  const corsi = useSelector((state) => state.admin.corsi || []);
  const [showModal, setShowModal] = useState(false);
  const [corsoData, setCorsoData] = useState({
    nome: "",
    descrizione: "",
    orario: "",
    giorno: "",
    maxPartecipanti: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [corsoToDelete, setCorsoToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchCorsi());
  }, [dispatch]);

  const handleOpenModal = (corso) => {
    setCorsoData(corso);
    setShowModal(true);
  };

  const handleCreate = () => {
    setCorsoData({
      nome: "",
      descrizione: "",
      orario: "",
      giorno: "",
      maxPartecipanti: "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCorsoData({ ...corsoData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = corsoData.id
      ? updateCorso(corsoData)
      : createCorso(corsoData);

    dispatch(action)
      .then(() => {
        dispatch(fetchCorsi());
        setShowModal(false);
        toast.success(
          corsoData.id
            ? "Corso aggiornato con successo!"
            : "Corso creato con successo!"
        );
      })
      .catch((error) => {
        console.error(
          "Errore durante la creazione/aggiornamento del corso: ",
          error
        );
        toast.error(
          "Si è verificato un errore durante la creazione/aggiornamento del corso!"
        );
      });
  };

  const handleDeleteConfirmed = () => {
    if (corsoToDelete) {
      dispatch(deleteCorso(corsoToDelete))
        .then(() => {
          toast.success("Corso eliminato con successo!");
          dispatch(fetchCorsi());
          setShowDeleteConfirm(false);
        })
        .catch((error) => {
          console.error("Errore durante l'eliminazione del corso:", error);
          toast.error("Si è verificato un errore durante l'eliminazione!");
        });
    }
    setCorsoToDelete(null);
  };

  return (
    <Container>
      <ToastContainer position="top-center" autoClose={2000} />
      <Row>
        <Col>
          <div className="d-flex align-items-baseline mb-4">
            <h2 className="titolo-shop me-2">Gestione Corsi</h2>
            <button className="admin-btn" onClick={handleCreate}>
              <i className="bi bi-plus-circle-fill"></i>
            </button>
          </div>

          <Table striped bordered responsive>
            <thead>
              <tr>
                <th className="titolo-tab">Id</th>
                <th className="titolo-tab nome-col">Nome</th>
                <th className="titolo-tab">Descrizione</th>
                <th className="titolo-tab">Orario</th>
                <th className="titolo-tab">Giorno</th>
                <th className="titolo-tab partecipanti-col">Partecipanti</th>
                <th className="titolo-tab">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(corsi) &&
                corsi.map((corso, index) => (
                  <tr key={index}>
                    <td>{corso.id}</td>
                    <td>{corso.nome}</td>
                    <td className="descrizione">{corso.descrizione}</td>
                    <td>{corso.orario}</td>
                    <td>{corso.giorno}</td>
                    <td>{corso.maxPartecipanti}</td>
                    <td>
                      <button
                        className="admin-btn"
                        onClick={() => handleOpenModal(corso)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="admin-btn"
                        onClick={() => {
                          setCorsoToDelete(corso.id);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Modifica Corso</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={corsoData.nome}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Descrizione</Form.Label>
                  <Form.Control
                    type="text"
                    name="descrizione"
                    value={corsoData.descrizione}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Orario</Form.Label>
                  <Form.Control
                    type="text"
                    name="orario"
                    value={corsoData.orario}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Giorno</Form.Label>
                  <Form.Control
                    as="select"
                    name="giorno"
                    value={corsoData.giorno}
                    onChange={handleChange}
                  >
                    <option value="">Seleziona un giorno</option>
                    <option value="LUNEDI">Lunedì</option>
                    <option value="MARTEDI">Martedì</option>
                    <option value="MERCOLEDI">Mercoledì</option>
                    <option value="GIOVEDI">Giovedì</option>
                    <option value="VENERDI">Venerdì</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Numero Massimo di Partecipanti</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxPartecipanti"
                    value={corsoData.maxPartecipanti}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
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
            <Modal.Body>Sei sicuro di voler eliminare questo corso?</Modal.Body>
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
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCorsi;
