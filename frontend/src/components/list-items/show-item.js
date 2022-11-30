import { useEffect, useState } from "react";
import Item from "./item";
import style from "./show-item.module.css";

const ShowItem = (props) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api")
      .then((res) => {
        if(res.ok){
          console.log(res)
          return res.json()
        }
      }).then(result => setOrders(result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ul className={style["ul-item"]}>
      {orders.map((item) => (
        <Item
          key={item._id}
          id={item._id}
          name={item.name}
          detail={item.detail}
          price={item.price}
          img={item.image}
          amount={1}
        />
      ))}
    </ul>
  );
};

export default ShowItem;
