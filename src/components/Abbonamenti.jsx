import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbbonamenti } from "../redux/actions/abbonamenti";

const Abbonamenti = () => {
  const dispatch = useDispatch();
  const abbonamenti = useSelector((state) => state.abbonamenti.abbonamenti);
  const error = useSelector((state) => state.abbonamenti.error);

  useEffect(() => {
    dispatch(fetchAbbonamenti());
  }, [dispatch]);

  if (error) {
    return <div>Errore nel caricamento degli abbonamenti: {error}</div>;
  }

  return (
    <Container className="my-3">
      <Row>
        {abbonamenti.map((abbonamento, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{abbonamento.tipoAbbonamento}</Card.Title>
                <p>{abbonamento.descrizione}</p>
                <Card.Text>Prezzo: {abbonamento.prezzo}</Card.Text>
                <Button variant="primary">Scegli</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Abbonamenti;
