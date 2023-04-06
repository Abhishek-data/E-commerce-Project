import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";
import axios from "axios";

const CartProvider = (props) => {
  const initialUserEmail = localStorage.getItem("userEmail");
  const [items, setItems] = useState([]);
  const [userEmail, setUserEmail] = useState(initialUserEmail);
  const CRUD_CRUD_KEY = "185b6467b7ff47da8c2aa6aa69700d1b";

  console.log(items);

  const userEmailHandler = (email) => {
    const newUserEmail = email.replace("@", "").replace(".", "");
    setUserEmail(newUserEmail);
    localStorage.setItem("userEmail", newUserEmail);
  };

  const cartUpdater = async () => {
    const res = await axios.get(
      `https://crudcrud.com/api/${CRUD_CRUD_KEY}/cart${userEmail}`
    );

    setItems(res.data);
    console.log(res.data);
  };

  const addItemToCartHandler = async (item) => {
    const existingCartItemIndex = items.findIndex(
      (element) => element.id === item.id
    );

    if (existingCartItemIndex >= 0) {
      const existingCartItem = items[existingCartItemIndex];
      const id = existingCartItem._id;
      const updatedCart = { ...item, quantity: existingCartItem.quantity + 1 };
      await axios.put(
        `https://crudcrud.com/api/${CRUD_CRUD_KEY}/cart${userEmail}/${id}`,
        updatedCart
      );
    } else {
      await axios.post(
        `https://crudcrud.com/api/${CRUD_CRUD_KEY}/cart${userEmail}`,
        item
      );
    }
    cartUpdater();
  };

  const incrementHandler = async (item) => {
    // const itemsCopy = [...items];
    // const idx = itemsCopy.findIndex((i) => i._id === item._id);
    // itemsCopy[idx].quantity++;

    // setItems(itemsCopy);
    const updatedItem = { item, quantity: item.quantity + 1 };
    try {
      const res = axios.put(
        `https://crudcrud.com/api/${CRUD_CRUD_KEY}/cart${userEmail}/${item._id}`,
        updatedItem
      );
      if (!res.OK) {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
    }

    cartUpdater();
  };

  const decrementHandler = async (item) => {
    if (item.quantity === 1) {
      await axios.delete(
        `https://crudcrud.com/api/${CRUD_CRUD_KEY}/cart${userEmail}/${item._id}`,
        item
      );
    } else {
      const updatedItem = { item, quantity: item.quantity - 1 };
      axios.put(
        `https://crudcrud.com/api/${CRUD_CRUD_KEY}/cart${userEmail}/${item._id}`,
        updatedItem
      );
    }

    cartUpdater();
  };

  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice = totalPrice + Number(item.price * item.quantity);
  });
  console.log(totalPrice);

  useEffect(() => {
    axios
      .get(`https://crudcrud.com/api/${CRUD_CRUD_KEY}/cart${userEmail}`)
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      });
  }, [userEmail]);

  const cartContext = {
    items: items,
    totalAmount: totalPrice,
    addItem: addItemToCartHandler,

    quantityplus: incrementHandler,
    quantityminus: decrementHandler,
    userIdentifier: userEmailHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
