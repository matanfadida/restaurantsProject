import classes from "./Header.module.css";
import Navigation from "./Navigation";
import { useContext } from "react";
import CartContext from "../../../state/buy-context";
import style from "./nav-bar.module.css";
import { BiRestaurant } from "react-icons/bi";
import SearchBox from "../../UI/SearchBox";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const ctx = useContext(CartContext);

  const navigate = useNavigate();
  const Logout = async () => {
    const response = await fetch(`/api/auth/logout`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const result = await response.json();
    if (result === "ok") {
      navigate("/", { replace: true });
    }
  };

  const adminIsLogin = false;
  /**@todo: מתן תוסיף פה בדיקה אם האדמין מחובר או לא */

  const numberOfItems = ctx.items.reduce((curNumber) => {
    return curNumber + 1;
  }, 0);
  return (
    <header className={classes.header}>
      <div className={classes.left}>
        <div className={style["main-div"]}>
          <a href="/" className={style["main-div__brand"]}>
            MTF
          </a>
        </div>
        <button className={style.btn} onClick={ctx.cartShowhandler}>
          <BiRestaurant size="40px" color="white" className={classes.icon} />
          {numberOfItems > 0 && (
            <span className={style["btn__badge"]}>{numberOfItems}</span>
          )}
        </button>

        {adminIsLogin && (
          <button className={classes.logout} onClick={Logout}>
            התנתק
          </button>
        )}
      </div>
      <SearchBox />

      <Navigation />
    </header>
  );
};

export default Header;
