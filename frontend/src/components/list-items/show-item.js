import { useEffect, useState } from "react";
import Item from "./item";
import classes from "./show-item.module.css";

const ShowItem = (props) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    fetch("/api")
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }
      })
      .then((result) => {
        setOrders(result);
        setSearch(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchProductHandler = (e) => {
    const val = e.target.value;
    setSearch(
      orders.filter((value) => {
        if (val === "") {
          return value;
        } else if (value.name.includes(val)) {
          return value;
        }
      })
    );
  };

  return (
    <div>
      <div className={classes["div-search"]}>
        <input
          className={classes["div-search__input"]}
          type="text"
          onChange={searchProductHandler}
          placeholder="חיפוש מנה"
        />
      </div>
      <ul className={classes["ul-item"]}>
        {search.map((item) => (
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
    </div>
  );
};

export default ShowItem;
