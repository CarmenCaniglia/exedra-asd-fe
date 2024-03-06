import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Col, Row } from "react-bootstrap";

const Mappa = () => {
  const center = { lat: 42.437103271484375, lng: 14.194849967956543 };
  const containerStyle = {
    width: "400px",
    height: "400px",
    border: "2px solid ",
    borderRadius: "10px",
    boxShadow: " -3px 5px 10px 0 #444242cf",
    overflow: "hidden",
  };

  const nightModeStyle = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const handleMarkerClick = () => {
    const url = `https://www.google.com/maps/?q=${center.lat},${center.lng}`;
    window.open(url, "_blank");
  };
  return (
    <Row className="maps-container justify-content-center mb-4 ">
      <Col md={3} className="d-flex align-items-center justify-content-center">
        <LoadScript googleMapsApiKey={apiKey}>
          <div className="scale-in-center">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={16}
              options={{ styles: nightModeStyle }}
            >
              <Marker
                position={center}
                title="Location Exedra"
                onClick={handleMarkerClick}
              />
            </GoogleMap>
          </div>
        </LoadScript>
      </Col>
      <Col
        md={4}
        className="contatti fade-in-right d-flex flex-column align-items-start justify-content-center"
      >
        <h2 className="titolo-shop w-100 text-center mt-3 mb-5">CONTATTACI:</h2>
        <div className="contatti-text" style={{ flexGrow: 1 }}>
          <div className="pb-4">
            <i className="bi bi-geo-alt-fill me-2"></i>Via Tiburtina Valeria,
            483 Pescara
          </div>
          <div>
            <i className="bi bi-telephone-fill me-2"></i>085 431 1806
          </div>
          <div className="py-4">
            <i className="bi bi-envelope-paper-heart-fill me-2"></i>{" "}
            ExedraAsd@gmail.com
          </div>
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
        </div>
      </Col>
    </Row>
  );
};

export default Mappa;
