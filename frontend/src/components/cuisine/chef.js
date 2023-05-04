import ChefItem from "./chefItem";
import classes from "./chef.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const Chef = (props) => {
  const [orders, setOrders] = useState([]);
  const [isChef, setIsChef] = useState(true);


  

  const isChefHandler = () => {
    const temp = !isChef
    setIsChef(temp)
  }

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

  const chefList = orders.map((order) => (
    <ChefItem
      orderId={order._id}
      key={order._id}
      products={order.products}
      table={order.numberTable}
    />
  ));


  const barList = orders.map((order) => (
    <ChefItem
      orderId={order._id}
      key={order._id}
      products={order.products}
      table={order.numberTable}
    />
  ));





  return (
    <div className={classes.chef}>
      <div className={classes.buttons}>
        <button onClick={isChefHandler} className={isChef ? classes.off : classes.on}>בר</button>
        <button onClick={isChefHandler} className={isChef ? classes.on : classes.off}>מטבח</button>
      </div>

      {isChef && <ul>{chefList}</ul>}
      {!isChef && <ul>{barList}</ul>}
    </div>
  );
};

export default Chef;
