import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const Corsi = () => {
  const [corsi, setCorsi] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/corsi?size=1000", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNzA3OTkwMjg4LCJleHAiOjE3MDg1OTUwODh9.LNhlL4MmB_oRxy6ZSiSJ7PhhboNqic7aHKVz4LompUc",
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
    // Se non esiste un array per quell'orario, crealo
    if (!acc[corso.orario]) {
      acc[corso.orario] = {};
    }
    // Aggiungi il nome del corso al giorno corrispondente
    acc[corso.orario][corso.giorno] = corso.nome;
    return acc;
  }, {});

  // Estrai gli orari univoci
  const orari = Object.keys(orariSettimanali).sort();
  const giorni = ["LUNEDI", "MARTEDI", "MERCOLEDI", "GIOVEDI", "VENERDI"];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Orario</th>
          {giorni.map((giorno) => (
            <th key={giorno}>{giorno}</th>
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
  );
};

export default Corsi;
