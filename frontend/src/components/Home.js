import { useParams } from "react-router-dom";
import { useContext } from "react";

import style from "./home.module.css";
import Category from "./list-items/category";
import ShowItem from "./list-items/show-item";
import Cookies from "js-cookie";
import CartContext from "../state/buy-context";

const Home = () => {
  const ctx = useContext(CartContext);

  return (
    <div className={style["main-div"]}>
      <div className={style.cart}>
        {!ctx.isLogged && Cookies.get("table") &&(
          <h2 className={style.welcome}>שולחן מספר {Cookies.get("table")}</h2>
        )}
      </div>
      <Category />
      <ShowItem />
    </div>
  );
};

export default Home;
