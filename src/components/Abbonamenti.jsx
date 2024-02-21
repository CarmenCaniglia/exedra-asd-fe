import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAbbonamenti,
  salvaAbbonamento,
} from "../redux/actions/abbonamenti";

const Abbonamenti = () => {
  const dispatch = useDispatch();
  const abbonamenti = useSelector((state) => state.abbonamenti.abbonamenti);
  const userId = useSelector((state) =>
    state.user.userData ? state.user.userData.id : null
  );
  const error = useSelector((state) => state.abbonamenti.error);

  useEffect(() => {
    dispatch(fetchAbbonamenti());
  }, [dispatch]);

  const handleScegli = (tipoAbbonamento) => {
    // Crea i dati dell'abbonamento
    const abbonamentoData = {
      tipoAbbonamento,
      userId,
    };
    dispatch(salvaAbbonamento(abbonamentoData));
  };

  if (error) {
    return <div>Errore nel caricamento degli abbonamenti: {error}</div>;
  }

  return (
    <Container className="my-3">
      <Row>
        {abbonamenti.slice(0, 3).map((abbonamento, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{abbonamento.tipoAbbonamento}</Card.Title>
                <p>{abbonamento.descrizione}</p>
                <Card.Text>Prezzo: {abbonamento.prezzo}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleScegli(abbonamento.tipoAbbonamento)}
                >
                  Scegli
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Abbonamenti;
