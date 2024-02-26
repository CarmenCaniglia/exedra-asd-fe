import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminAbbonamenti } from "../redux/actions/admin";

const AdminAbbonamenti = () => {
  const dispatch = useDispatch();
  const { abbonamenti, loading, error, totalPages } = useSelector(
    (state) => state.admin
  );
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(fetchAdminAbbonamenti());
  }, [dispatch]);

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
          <h2>Gestione Abbonamenti</h2>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo Abbonamento</th>
                <th>Descrizione</th>
                <th>Prezzo</th>
                <th>Durata</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(abbonamenti) &&
                abbonamenti.map((abbonamento) => (
                  <tr key={abbonamento.id}>
                    <td>{abbonamento.id}</td>
                    <td>{abbonamento.tipoAbbonamento}</td>
                    <td>{abbonamento.descrizione}</td>
                    <td>{abbonamento.prezzo}€</td>
                    <td>
                      dal {abbonamento.dataInizio} al {abbonamento.dataFine}
                    </td>
                    <td>
                      {/* Pulsanti di azione per modificare/eliminare l'abbonamento */}
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

export default AdminAbbonamenti;
