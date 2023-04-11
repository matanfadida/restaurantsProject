import ChefItem from "./chefItem";
import classes from "./chef.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const Chef = (props) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000/"); // Replace with your server URL

    // Add event listeners to the socket object
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("new-order", (order) => {
      setOrders(order);
      console.log("New order received: ", order);
    });

    fetch("/api/chef/getOrders")
      .then((res) => {
        return res.json();
      })
      .then((result) => setOrders(result))
      .catch();
  }, []);

  const orderList = orders.map((order) => (
    <ChefItem
      orderId={order._id}
      key={order._id}
      products={order.products}
      table={order.numberTable}
    />
  ));

  return (
    <div className={classes.chef}>
      <ul>{orderList}</ul>
    </div>
  );
};

export default Chef;
