import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer mt-auto py-4 bg-white">
      <Container>
        <Row className="justify-content-center">
          <Col className="d-flex align-items-center justify-content-around">
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
                href="https://www.linkedin.com/in/carmen-caniglia-webdeveloper/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-linkedin me-2"></i>
              </a>
              <a
                href="https://github.com/CarmenCaniglia"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <i className="bi bi-github"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
