import styles from "./nav-bar.module.css";

const NavigationBar = () => {
  return (
    <header className={styles["main-header"]}>
      <div className={styles["main-div"]}>
        <a href="index.html" className={styles["main-div__brand"]}>
          M&H
        </a>
      </div>
      <nav className={styles["main-nav"]}>
        <img src="./image-home-backgrond.jpg" alt="dinner"/>
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
