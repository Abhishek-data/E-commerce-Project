import React, { useContext } from "react";
import CartItem from "./CartItem";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "./Cart.css";
import Modal from "../UI/Modal";
import CartContext from "../Store/CartContext";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  console.log(cartCtx.items);

  const purchaseHandler = () => {
    if (cartCtx.items.length > 0) {
      alert("Thanks for purchase!");
    } else {
      alert("You have Nothing in Cart , Add some products to purchase !");
    }
  };
  const items = (
    <Table responsive="sm">
      <thead>
        <tr className="th">
          <th className="item">ITEM</th>
          <th className="price">PRICE</th>
          <th className="quantity">QUANTITY</th>
        </tr>
      </thead>
      <tbody>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            quantity={item.quantity}
          />
        ))}
      </tbody>
    </Table>
  );

  return (
    <Modal onClose={props.onClose}>
      <Container className="cart">
        <Row>
          <Col className="text-center cart-text">Cart</Col>
        </Row>
        <Row>
          <Col className="text-center">
            <div className="cart-items">{items}</div>
            <div>
              <span>Total Price</span> <span>${cartCtx.totalAmount}</span>
            </div>
            <div>
              <Button className="purchase-button" onClick={purchaseHandler}>
                PURCHASE
              </Button>

              <Button onClick={props.onClose}>CLOSE</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default Cart;
