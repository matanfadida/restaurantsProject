import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../UI/loader";
import Item from "./item";
import classes from "./show-item.module.css";

const ShowItem = (props) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterVal = queryParams.get("filter");
  const categoryVal = queryParams.get("category");
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/api");
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      setOrders(result);
      setSearch(result);
      setLoading(false);
    };
    fetchProduct().catch((error) => {
      setLoading(false);
      // setHasError(error.message || "Something went wrong!");
    });
  }, []);

  useEffect(() => {
    const val = categoryVal;
    setSearch(
      orders.filter((value) => {
        if (val === null) {
          return value;
        } else if (value.category === val) {
          return value;
        }
      })
    );
  }, [categoryVal]);

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

  if (loading) {
    return <Loader/>
  }
  if (search.length === 0) {
    return (
      <div className={classes.noFound}>לא נמצאו פריטים התואמים את החיפוש</div>
    );
  }
  return (
    <div className={classes.div}>
      {
        <ul className={classes["ul-item"]}>
          {search.map((item) => (
            <Item
              key={item._id}
              id={item._id}
              name={item.name}
              detail={item.detail}
              price={item.price}
              img={item.image}
              rating={item.rating}
              amount={1}
            />
          ))}
        </ul>
      }
    </div>
  );
};

export default ShowItem;
