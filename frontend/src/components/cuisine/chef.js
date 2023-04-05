import ChefItem from "./chefItem";
import classes from "./chef.module.css";
import { useEffect, useState } from "react";

const Chef = (props) => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    fetch("/api/chef/getOrders")
      .then((res) => {
        return res.json();
      })
      .then((result) => setOrders(result))
      .catch();
  }, []);
  const orderList = orders.map((order) => (
    <ChefItem
      key={order.id}
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
