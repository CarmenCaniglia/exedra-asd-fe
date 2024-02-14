import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";

const Register = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [role, setRole] = useState("USER");

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        nome,
        cognome,
        role,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella richiesta!");
        }
        return response.json();
      })
      .then(() => {
        handleClose();
        setEmail("");
        setPassword("");
        setNome("");
        setCognome("");
        setRole("USER");
        alert("Registrazione completata con successo!");
      })
      .catch((err) => {
        alert(
          "Si è verificato un errore durante la registrazione: " + err.message
        );
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrazione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mt-1">
            <FormLabel>Nome</FormLabel>
            <FormControl
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mt-3">
            <FormLabel>Cognome</FormLabel>
            <FormControl
              type="text"
              value={cognome}
              onChange={(e) => setCognome(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mt-3">
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="mt-3">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <Button variant="primary" type="submit" className="mt-3">
            Registrati
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
