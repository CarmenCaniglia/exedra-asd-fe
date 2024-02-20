import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Abbonamenti = () => {
  const [abbonamenti, setAbbonamenti] = useState([]);

  const getAbbonamenti = async () => {
    try {
      const res = await fetch("http://localhost:3001/abbonamenti", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNzA4NDUzMTg4LCJleHAiOjE3MDkwNTc5ODh9.wDY_KQsORxGqeDeg-O7VJ0EYg2EurOWjezfa3V9YBYU",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setAbbonamenti(data.content);
    } catch (err) {
      console.error("Errore nel caricamento degli abbonamenti", err);
    }
  };

  useEffect(() => {
    getAbbonamenti();
  }, []);

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
