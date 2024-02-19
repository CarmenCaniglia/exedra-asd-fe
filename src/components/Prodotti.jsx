import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProdottiAction } from "../redux/actions";

const Prodotti = ({ setSelected, selected }) => {
  const dispatch = useDispatch();
  const prodotti = useSelector((state) => state.prodotto.stock);

  useEffect(() => {
    // getProdotti();
    dispatch(getProdottiAction());
  }, []);

  // const getProdotti = async () => {
  //   try {
  //     const resp = await fetch("http://localhost:3001/prodotti", {
  //       headers: {
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNzA4MzMzNDk4LCJleHAiOjE3MDg5MzgyOTh9.wAay29oYqaotKgZ28boGxsh04zIe3bKGD9TW2j2prgU", // Add your token here
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!resp.ok) {
  //       throw new Error(`HTTP error! status: ${resp.status}`);
  //     }
  //     const data = await resp.json();
  //     setProdotti(data.content);
  //     console.log(data);
  //   } catch (err) {
  //     console.error("Non è possibile recuperare la lista dei prodotti:", err);
  //   }
  // };

  const changeProdotto = (prodotto) => {
    setSelected(prodotto);
  };

  return (
    <div>
      {prodotti.map((prodotto, index) => (
        <Card
          key={index}
          className={`mt-3 ${
            selected?.id === prodotto.id ? "border border-3" : ""
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
              <Card.Text className="fw-bold">{prodotto.nome}</Card.Text>
              <p>{prodotto.prezzo}€</p>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Prodotti;
