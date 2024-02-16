import { Col, Container, Row } from "react-bootstrap";
import image from "../assets/immagini/home1.png";
import HomeCorsi from "./HomeCorsi";
import Galleria from "./Galleria";
import Trainer from "./Trainer";

const Home = () => {
  return (
    <Container fluid>
      <Row className="my-5 d-flex align-items-center justify-content-center">
        <Col lg={6} md={12} className="d-flex">
          <img alt="trainer" src={image} className="img-fluid img-home" />

          <div className="d-flex align-items-center text-center">
            <p>
              Noi di Exedra ci impegnamo a fornire un ambiente accogliente e
              motivante dove persone di tutte le età e livelli di fitness
              possono raggiungere i loro obiettivi di salute e benessere. Con
              allenatori esperti, attrezzature all&apos; avanguardia e una vasta
              gamma di classi e programmi, siamo qui per guidarti nel tuo
              viaggio verso una vita più sana e attiva. Siamo più di una
              palestra, siamo una comunità dedicata al miglioramento personale e
              al sostegno reciproco. Unisciti a noi e inizia il tuo percorso
              verso una versione più forte, più felice e più sana di te stesso!
            </p>
          </div>
        </Col>
      </Row>
      <HomeCorsi />
      <Galleria />
      <Trainer />
    </Container>
  );
};

export default Home;
