import ChefItem from "./chefItem";
import classes from "./chef.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import ButtonGroup from "../UI/ButtonGroup";

const Chef = (props) => {
  const [orders, setOrders] = useState([]);
  const [isChef, setIsChef] = useState(true);
  const [ready, setReady] = useState(true);

  const isChefHandler = () => {
    setIsChef(true);
  };

  const isbarHandler = () => {
    setIsChef(false);
  };

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
  }, [ready]);

  const chefList = orders.map((order) => (
    <ChefItem
      ready={setReady}
      orderId={order._id}
      key={order._id}
      products={order.products.filter(
        (x) => x.worker === "chef" && x.status !== "מוכן"
      )}
      table={order.numberTable}
    />
  ));

  const barList = orders.map((order) => (
    <ChefItem
      ready={setReady}
      orderId={order._id}
      key={order._id}
      products={order.products.filter(
        (x) => x.worker === "bar" && x.status !== "מוכן"
      )}
      table={order.numberTable}
    />
  ));

  return (
    <div className={classes.chef}>
      <div className={classes.buttons}>
        <ButtonGroup
          focus={2}
          buttons={[
            { id: 1, onClick: isbarHandler, name: "בר" },
            { id: 2, onClick: isChefHandler, name: "מטבח" },
          ]}
        ></ButtonGroup>
      </div>

      {isChef && (
        <div>
          {" "}
          <h3>cuisine</h3>
          <ul>{chefList}</ul>
        </div>
      )}
      {!isChef && (
        <div>
          {" "}
          <h3>bar</h3>
          <ul>{barList}</ul>
        </div>
      )}
    </div>
  );
};

export default Chef;
