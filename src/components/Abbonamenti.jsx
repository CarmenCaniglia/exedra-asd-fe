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
    <Container fluid className="abb-container">
      <Row className="mx-3">
        {abbonamenti.slice(0, 3).map((abbonamento, index) => (
          <Col key={index} md={4} sm={12} className="mb-4">
            <Card className="class-card">
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <Card.Text className="abb-title">
                  {abbonamento.tipoAbbonamento}
                </Card.Text>
                <p className="descrizione-abb ">{abbonamento.descrizione}</p>
                <Card.Text className="prezzo-abb">
                  {abbonamento.prezzo} €
                </Card.Text>
                <Button
                  className="custom-btn2"
                  onClick={() => handleScegli(abbonamento.tipoAbbonamento)}
                >
                  ACQUISTA
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
