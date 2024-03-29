import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

const Corsi = () => {
  const [corsi, setCorsi] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/corsi?size=1000", {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION_TOKEN}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Errore nella richiesta! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCorsi(data.content);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  }, []);

  if (error) {
    return <div>Errore: {error}</div>;
  }

  if (!corsi.length) {
    return <div>Caricamento...</div>;
  }

  const orariSettimanali = corsi.reduce((acc, corso) => {
    if (!acc[corso.orario]) {
      acc[corso.orario] = {};
    }
    acc[corso.orario][corso.giorno] = corso.nome;
    return acc;
  }, {});

  const orari = Object.keys(orariSettimanali).sort();
  const giorni = ["LUNEDI", "MARTEDI", "MERCOLEDI", "GIOVEDI", "VENERDI"];

  return (
    <Container fluid className="tabella-container">
      <Table striped bordered className="tabella-corsi ">
        <thead>
          <tr>
            <th className="titolo-tab">ORARIO</th>
            {giorni.map((giorno) => (
              <th className="titolo-tab" key={giorno}>
                {giorno}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orari.map((orario) => (
            <tr key={orario}>
              <td>{orario}</td>
              {giorni.map((giorno) => (
                <td key={giorno}>{orariSettimanali[orario][giorno] || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Corsi;
