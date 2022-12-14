import { useContext } from "react";
import CartContext from "../../state/buy-context";
import style from "./nav-bar.module.css";
import NavLinks from "./NavLinks";

const NavigationBar = () => {
  const ctx = useContext(CartContext);

  const numberOfItems = ctx.items.reduce((curNumber) => {
    return curNumber + 1;
  }, 0);

  return (
    <header className={style["main-header"]}>
      <div>
        <div className={style["main-div"]}>
          <a href="index.html" className={style["main-div__brand"]}>
            M&H
          </a>
        </div>
        <div className={style["main-nav"]}>
          <button className={style.btn} onClick={ctx.cartShowhandler}>
            <img
              src={"./wedding-dinner.png"}
              alt="dinner"
              className={style.img}
            />
            {numberOfItems > 0 && (
              <span className={style["btn__badge"]}>{numberOfItems}</span>
            )}
          </button>
        </div>
      </div>
      <NavLinks />
    </header>
  );
};

export default NavigationBar;
