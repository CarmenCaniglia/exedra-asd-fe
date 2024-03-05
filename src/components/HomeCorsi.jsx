import { Col, Container, Row } from "react-bootstrap";
import yogaImage from "../assets/icone corsi/meditation.png";
import functionalImage from "../assets/icone corsi/gym.png";
import cardioImage from "../assets/icone corsi/dumbbell.png";
import powerImage from "../assets/icone corsi/dumbbell (1).png";
import boxeImage from "../assets/icone corsi/boxing-gloves.png";
import pilatesImage from "../assets/icone corsi/woman-stretching-her-body-on-the-floor.png";
import { useNavigate } from "react-router-dom";

const HomeCorsi = () => {
  const classi = [
    {
      nome: "YOGA CLASS",
      descrizione:
        "Lo yoga è una disciplina, che racchiude molti stili, di origini indiane. Le sue radici si perdono nella notte dei tempi: nasce come pratica spirituale e di meditazione, per poi approdare nel mondo occidentale come tecnica di rilassamento, per la pace dell' anima.",
      imgPath: yogaImage,
    },
    {
      nome: "CARDIO CLASS",
      descrizione:
        "L'allenamento cardio comprende una serie di esercizi che consentono di allenare il corpo nella su interezza e migliorare le prestazioni dell'apparato cardio respiratorio.",
      imgPath: cardioImage,
    },
    {
      nome: "FUNCTIONAL CLASS",
      descrizione:
        "L'allenamento funzionale è una tipologia di allenamento, basata sull'esecuzione dei movimenti naturali del corpo, utile per definire la muscolatura senza appesantirla.",
      imgPath: functionalImage,
    },
    {
      nome: "POWER CLASS",
      descrizione:
        "Circuito metabolico sviluppato per un lavoro globale funzionale e non per singoli gruppi muscolari, organizzato attraverso lavori globali integrati. Un vero e proprio allenamento del movimento!",
      imgPath: powerImage,
    },
    {
      nome: "BOXING CLASS",
      descrizione:
        "La fit boxe è una disciplina adrenalinica e molto coinvolgente che combina, in un unico allenamento, aerobica, arti marziali e tecniche da combattimento col risultato di tonificare la totalità dei muscoli del corpo, dimagrire e scaricare un po' di stress quotidiano.",
      imgPath: boxeImage,
    },
    {
      nome: "PILATES CLASS",
      descrizione:
        "Il Pilates è una disciplina che combina l'allenamento fisico ad un metodo di respirazione che ha come obiettivo quello di per sollecitare la cintura addominale. Si tratta soprattutto di movimenti lenti e ripetuti per assumere consapevolezza del proprio corpo e allenarlo alla forma fisica.",
      imgPath: pilatesImage,
    },
  ];

  const navigate = useNavigate();
  const goToCorsi = () => {
    navigate("/corsi");
  };

  return (
    <Container className=" mb-5">
      <Row className="g-3">
        {classi.map((classe, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={4}
            className="classi d-flex align-items-stretch"
          >
            <div className="class-card d-flex flex-column align-items-center text-center p-4 ">
              <img
                src={classe.imgPath}
                alt={classe.nome}
                className="class-image mb-2 "
              />
              <h3>{classe.nome}</h3>
              <p>{classe.descrizione}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Row className="mt-3">
        <Col className="text-center">
          <button onClick={goToCorsi} className="bn632-hover bn19 mt-3 mb-5">
            TUTTI I CORSI
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeCorsi;
