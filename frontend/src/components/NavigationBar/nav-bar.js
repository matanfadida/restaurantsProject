import { useContext } from "react";
import CartContext from "../../state/buy-context";
import style from "./nav-bar.module.css";
// import M from "./image-home-backgrond.jpg";

const NavigationBar = () => {
  const ctx = useContext(CartContext);

  const numberOfItems = ctx.items.reduce((curNumber) => {
    return curNumber + 1
  },0)

  return (
    <header className={style["main-header"]}>
      <div className={style["main-div"]}>
        <a href="index.html" className={style["main-div__brand"]}>
          M&H
        </a>
      </div>
      <nav className={style["main-nav"]}>
        <button className={style.btn} onClick={ctx.cartShowhandler}>
          <img src={"./wedding-dinner.png"} alt="dinner" className={style.img}/>
          {numberOfItems > 0&& <span className={style["btn__badge"]}>{numberOfItems}</span>}
        </button>
        
        {/* <ul className={styles["main-nav__items"]}>
          <li className={styles["main-nav__item"]}>
            <a href="packages/index.html">Packages</a>
          </li>
          <li className={styles["main-nav__item"]}>
            <a href="customers/index.html">Customers</a>
          </li>
          {/* <li className={`${styles["main-nav__item"]} ${styles["main-nav__item--cta"]}`}>
            <a href="start-hosting/index.html">Start Hosting</a>
          </li> 
        </ul> */}
      </nav>
    </header>
  );
};

export default NavigationBar;
