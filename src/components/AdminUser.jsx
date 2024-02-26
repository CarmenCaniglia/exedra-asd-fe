import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUtenti } from "../redux/actions/admin";
import {
  Button,
  Col,
  Container,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";

const AdminUser = () => {
  const dispatch = useDispatch();
  const { utenti, loading, error, totalPages } = useSelector(
    (state) => state.admin
  );
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchUtenti(currentPage));
  }, [dispatch, currentPage]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage + 1}
        onClick={() => handlePageClick(number - 1)}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error}</div>;

  return (
    <Container>
      <Row>
        <Col>
          <h2>Gestione Utenti</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Cognome</th>
                <th>Email</th>
                <th>Ruolo</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(utenti) &&
                utenti.map((utente) => (
                  <tr key={utente.id}>
                    <td>{utente.id}</td>
                    <td>{utente.nome}</td>
                    <td>{utente.cognome}</td>
                    <td>{utente.email}</td>
                    <td>{utente.role}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ marginRight: "5px" }}
                      >
                        Modifica
                      </Button>
                      <Button variant="danger" size="sm">
                        Elimina
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Pagination>{items}</Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminUser;
