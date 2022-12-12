import classes from "./Header.module.css";
import Navigation from "./Navigation";
import { useContext } from "react";
import CartContext from "../../../state/buy-context";
import style from "./nav-bar.module.css";
import { BiRestaurant } from "react-icons/bi";

const Header = () => {
  const ctx = useContext(CartContext);

  const numberOfItems = ctx.items.reduce((curNumber) => {
    return curNumber + 1;
  }, 0);
  return (
    <header className={classes.header}>
      <div>
        <div className={style["main-div"]}>
          <a href="index.html" className={style["main-div__brand"]}>
            M&H
          </a>
        </div>
        <div className={style["main-nav"]}>
          <button className={style.btn} onClick={ctx.cartShowhandler}>
            <BiRestaurant size="40px" color="white" className={classes.icon} />
            {numberOfItems > 0 && (
              <span className={style["btn__badge"]}>{numberOfItems}</span>
            )}
          </button>
        </div>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
