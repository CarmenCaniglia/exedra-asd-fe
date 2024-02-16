import image1 from "../assets/Galleria/1.jpg";
import image2 from "../assets/Galleria/2.jpg";
import image3 from "../assets/Galleria/3.jpg";
import image4 from "../assets/Galleria/4.jpg";
import image5 from "../assets/Galleria/5.jpg";
import image6 from "../assets/Galleria/6.jpg";
import image7 from "../assets/Galleria/7.jpg";
import image8 from "../assets/Galleria/8.jpg";
import image9 from "../assets/Galleria/9.jpg";
import image10 from "../assets/Galleria/10.jpg";
import { Carousel, Col, Container, Row } from "react-bootstrap";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];
const Galleria = () => {
  return (
    <Container className="mt-3 mb-3">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={10}>
          {" "}
          <Carousel fade className="carousel-3d">
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 carousel-image"
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default Galleria;
