import { Col, Container, Row } from "react-bootstrap";
import image from "../assets/immagini/home1remove.png";
import HomeCorsi from "./HomeCorsi";
import Galleria from "./Galleria";
import Trainer from "./Trainer";

const Home = () => {
  return (
    <Container fluid>
      <Row className="section1 my-5 d-flex align-items-center justify-content-between">
        <Col className="mb-3 mb-lg-0 d-flex justify-content-end fade-in-left">
          <img alt="trainer" src={image} className="img-fluid img-home" />
        </Col>
        <Col
          lg={6}
          md={12}
          className="text-container d-flex flex-column  text-left fade-in-right"
        >
          <p className="text align-self-end">IMPROVE YOUR FITNESS</p>
        </Col>
      </Row>
      <HomeCorsi />
      <Trainer />
      <Galleria />
    </Container>
  );
};

export default Home;
