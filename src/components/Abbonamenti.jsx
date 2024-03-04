import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
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

  const stripeUrls = {
    MENSILE: "https://buy.stripe.com/test_7sIg2t4KidU3ahq144",
    TRIMESTRALE: "https://buy.stripe.com/test_00g7vXfoWbLV4X6cMN",
    ANNUALE: "https://buy.stripe.com/test_3cs6rTdgO4jt4X6146",
  };

  const handleScegli = (tipoAbbonamento) => {
    const abbonamentoData = {
      tipoAbbonamento,
      userId,
    };

    const confermaAcquisto = window.confirm(
      "Sei sicuro di voler acquistare questa tipologia di abbonamento?"
    );

    if (confermaAcquisto) {
      dispatch(salvaAbbonamento(abbonamentoData))
        .then(() => {
          window.alert(
            "Abbonamento associato con successo. Procedi al pagamento."
          );
          const url = stripeUrls[tipoAbbonamento];
          if (url) {
            window.open(url, "_blank");
          } else {
            console.error("URL non trovato per il tipo di abbonamento");
          }
        })
        .catch((error) => {
          console.error(
            "Errore durante l'associazione dell'abbonamento:",
            error
          );
        });
    }
  };

  if (error) {
    return <div>Errore nel caricamento degli abbonamenti: {error}</div>;
  }

  return (
    <Container fluid className="abb-container">
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
    </Container>
  );
};

export default Abbonamenti;
