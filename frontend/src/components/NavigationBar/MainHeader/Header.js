import classes from "./Header.module.css";
import Navigation from "./Navigation";
import { useContext } from "react";
import CartContext from "../../../state/buy-context";
import style from "./nav-bar.module.css";
import { BiRestaurant } from "react-icons/bi";
import SearchBox from "../../UI/SearchBox";

const Header = () => {
  const ctx = useContext(CartContext);

  const numberOfItems = ctx.items.reduce((curNumber) => {
    return curNumber + 1;
  }, 0);
  return (
    <header className={classes.header}>
      <div className={classes.left}>
        <div className={style["main-div"]}>
          <a href="/" className={style["main-div__brand"]}>
            M&H
          </a>
        </div>
        <button className={style.btn} onClick={ctx.cartShowhandler}>
          <BiRestaurant size="40px" color="white" className={classes.icon} />
          {numberOfItems > 0 && (
            <span className={style["btn__badge"]}>{numberOfItems}</span>
          )}
        </button>
      </div>
      <SearchBox />

      <Navigation />
    </header>
  );
};

export default Header;
