import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer mt-auto py-3 bg-white">
      <Container>
        <Row className="justify-content-center">
          <Col className="d-flex align-items-center justify-content-between">
            <p className="mb-0">
              Exedra asd <span className="social-icon">©</span>
              {year}
            </p>
            <p className="mb-0 mx-3">
              <i className="social-icon bi bi-geo-alt-fill"></i>Via Tiburtina
              Valeria 483, Pescara
            </p>
            <div>
              <a
                href="https://www.facebook.com/palestraexedra"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-facebook me-2"></i>
              </a>
              <a
                href="https://www.instagram.com/palestra_exedra_fitness_danza/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
