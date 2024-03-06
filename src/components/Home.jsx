import { Col, Container, Row } from "react-bootstrap";
import image from "../assets/immagini/home1remove.png";
import HomeCorsi from "./HomeCorsi";
import Galleria from "./Galleria";
import Trainer from "./Trainer";
import Mappa from "./Mappa";
import useIntersectionObserver from "./UseIntersectionObserver";

const Home = () => {
  const [isVisibleImage, refImage] = useIntersectionObserver({
    threshold: 0.5,
  });
  const [isVisibleText, refText] = useIntersectionObserver({ threshold: 0.5 });
  return (
    <Container fluid>
      <Row className="section1 my-5 d-flex align-items-center justify-content-between">
        <Col
          className={`mb-3 mb-lg-0 d-flex justify-content-end ${
            isVisibleImage ? "fade-in-left" : ""
          }`}
          ref={refImage}
        >
          <img
            alt="trainer"
            src={image}
            className={`img-fluid img-home ${
              isVisibleImage ? "fade-in-effect" : ""
            }`}
          />
        </Col>
        <Col
          lg={6}
          md={12}
          ref={refText}
          className={`text-container d-flex flex-column text-left ${
            isVisibleText ? "fade-in-right" : ""
          }`}
        >
          <p
            className={`text align-self-end ${
              isVisibleText ? "fade-in-effect" : ""
            }`}
          >
            IMPROVE YOUR FITNESS
          </p>
        </Col>
      </Row>
      <HomeCorsi />
      <Trainer />
      <Galleria />
      <Mappa />
    </Container>
  );
};

export default Home;
