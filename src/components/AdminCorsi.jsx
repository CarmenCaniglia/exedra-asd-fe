import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCorsi } from "../redux/actions/admin";
import { useEffect } from "react";

const AdminCorsi = () => {
  const dispatch = useDispatch();
  const corsi = useSelector((state) => state.admin.corsi || []);

  useEffect(() => {
    dispatch(fetchCorsi());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="titolo-shop mb-4">Gestione Corsi</h2>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th className="titolo-tab">Id</th>
                <th className="titolo-tab">Nome</th>
                <th className="titolo-tab">Descrizione</th>
                <th className="titolo-tab">Orario</th>
                <th className="titolo-tab">Giorno</th>
                <th className="titolo-tab">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(corsi) &&
                corsi.map((corso, index) => (
                  <tr key={index}>
                    <td>{corso.id}</td>
                    <td>{corso.nome}</td>
                    <td>{corso.descrizione}</td>
                    <td>{corso.orario}</td>
                    <td>{corso.giorno}</td>
                    <td>
                      <button className="admin-btn">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="admin-btn">
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCorsi;
