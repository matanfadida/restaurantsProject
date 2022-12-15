import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Item from "./item";
import classes from "./show-item.module.css";


const ShowItem = (props) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterVal = queryParams.get('filter');
  useEffect(() => {
    fetch("/api")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        setOrders(result);
        setSearch(result);
      })
      .catch((err) => console.log(err));
  }, []);

  // const searchProductHandler = (e) => {
  //   const val = e.target.value;
  //   setSearch(
  //     orders.filter((value) => {
  //       if (val === "") {
  //         return value;
  //       } else if (value.name.includes(val)) {
  //         return value;
  //       }
  //     })
  //   );
  // };
  useEffect(() => {
    const val = filterVal;
    setSearch(
      orders.filter((value) => {
        if (val === "") {
          return value;
        } else if (value.name.includes(val)) {
          return value;
        }
      })
    );
  }, [filterVal]);

  let noFound = false;
  if(search.length === 0){
    noFound=<div className={classes.noFound}>לא נמצאו פריטים התואמים את החיפוש</div>
  }

  return (
    <div>
      {/* <div className={classes["div-search"]}>
        <input
          className={classes["div-search__input"]}
          type="text"
          onChange={searchProductHandler}
          placeholder="חיפוש מנה"
        />
      </div> */}
      {noFound}
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
