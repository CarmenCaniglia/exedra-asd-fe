import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAbbonamenti,
  salvaAbbonamento,
} from "../redux/actions/abbonamenti";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Abbonamenti = () => {
  const dispatch = useDispatch();
  const abbonamenti = useSelector((state) => state.abbonamenti.abbonamenti);
  const userId = useSelector((state) =>
    state.user.userData ? state.user.userData.id : null
  );
  const error = useSelector((state) => state.abbonamenti.error);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedAbbonamento, setSelectedAbbonamento] = useState(null);

  useEffect(() => {
    dispatch(fetchAbbonamenti());
  }, [dispatch]);

  const stripeUrls = {
    MENSILE: "https://buy.stripe.com/test_7sIg2t4KidU3ahq144",
    TRIMESTRALE: "https://buy.stripe.com/test_00g7vXfoWbLV4X6cMN",
    ANNUALE: "https://buy.stripe.com/test_3cs6rTdgO4jt4X6146",
  };

  const handleScegli = (tipoAbbonamento) => {
    setSelectedAbbonamento(tipoAbbonamento);
    setShowConfirm(true);
  };

  const handleConfermaAcquisto = () => {
    if (selectedAbbonamento) {
      const abbonamentoData = {
        tipoAbbonamento: selectedAbbonamento,
        userId,
      };

      dispatch(salvaAbbonamento(abbonamentoData))
        .then(() => {
          toast.success("Abbonamento associato con successo!");
          setShowConfirm(false);
          const url = stripeUrls[selectedAbbonamento];
          if (url) {
            window.open(url, "_blank");
          } else {
            toast.error("URL non trovato per il tipo di abbonamento");
          }
        })
        .catch((error) => {
          toast.error("Errore durante l'associazione dell'abbonamento:", error);
        });
    }
  };

  const handleClose = () => setShowConfirm(false);

  if (error) {
    return <div>Errore nel caricamento degli abbonamenti: {error}</div>;
  }

  return (
    <Container fluid className="abb-container">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ marginTop: "70px" }}
      />
      <Row className="mx-5">
        {abbonamenti.slice(0, 3).map((abbonamento, index) => (
          <Col key={index} md={4} sm={12} className="mb-4 ">
            <Card className="class-card">
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <Card.Text className="abb-title">
                  {abbonamento.tipoAbbonamento}
                </Card.Text>
                <p className="descrizione-abb ">{abbonamento.descrizione}</p>
                <Card.Text className="prezzo-abb">
                  {abbonamento.prezzo} €
                </Card.Text>
                <button
                  className="bn632-hover bn19"
                  onClick={() => handleScegli(abbonamento.tipoAbbonamento)}
                >
                  ACQUISTA
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Acquisto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler acquistare questa tipologia di abbonamento?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleConfermaAcquisto}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Abbonamenti;
