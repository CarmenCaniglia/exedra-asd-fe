import { Col, Container, Row } from "react-bootstrap";
import t1 from "../assets/immagini/trainer1.jpg";
import t2 from "../assets/immagini/trainer2.jpg";
import t3 from "../assets/immagini/trainer3.jpg";
import t4 from "../assets/immagini/trainer4.jpg";
import t5 from "../assets/immagini/trainer5.jpg";

const trainers = [
  { nome: "ALEX JONES", pic: t1 },
  { nome: "SARA CAVIL", pic: t2 },
  { nome: "MARK BLAKE", pic: t3 },
  { nome: "LUCY GRAY", pic: t4 },
  { nome: "ERIC SMITH", pic: t5 },
];

const Trainer = () => {
  return (
    <Container fluid className="text-center">
      <Row className="justify-content-center">
        <div className="title-container ">
          <h2 className="title">I NOSTRI TRAINER</h2>
        </div>
        {trainers.map((trainers, index) => (
          <Col key={index} lg={2} md={6} sm={12} className="mt-5 mb-4 ">
            <div className="trainer-card  mx-auto">
              <img
                src={trainers.pic}
                alt={trainers.nome}
                className="card-img img-fluid bw-filter"
              />
              <div className="card-body trainer-info ">
                <h5 className="card-title p-3">{trainers.nome}</h5>
                <p>Personal Trainer</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Trainer;
