import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProdottiAction } from "../redux/actions";

const Prodotti = ({ setSelected, selected }) => {
  const dispatch = useDispatch();
  const prodotti = useSelector((state) => state.prodotto.stock);

  useEffect(() => {
    dispatch(getProdottiAction());
  }, []);

  const changeProdotto = (prodotto) => {
    setSelected(prodotto);
  };

  return (
    <div>
      {prodotti.map((prodotto, index) => (
        <Card
          key={index}
          style={{ cursor: "pointer" }}
          className={`mt-3 ${
            selected?.id === prodotto.id ? "card-prodotto border border-3" : ""
          }`}
          onClick={() => changeProdotto(prodotto)}
        >
          <Card.Body className="d-flex">
            <img
              src={prodotto.image}
              alt="img prodotto"
              className="picProdotto img-fluid"
            />
            <div>
              <Card.Text className="fw-bold titolo-shop">
                {prodotto.nome}
              </Card.Text>
              <p>{prodotto.prezzo}€</p>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Prodotti;
