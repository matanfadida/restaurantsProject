import styles from "./nav-bar.module.css";

const NavigationBar = () => {
  return (
    <header class={styles["main-header"]}>
      <div class={styles["main-div"]}>
        <a href="index.html" class={styles["main-div__brand"]}>
          M&H
        </a>
      </div>
      <nav class={styles["main-nav"]}>
        <ul class={styles["main-nav__items"]}>
          <li class={styles["main-nav__item"]}>
            <a href="packages/index.html">Packages</a>
          </li>
          <li class={styles["main-nav__item"]}>
            <a href="customers/index.html">Customers</a>
          </li>
          {/* <li className={`${styles["main-nav__item"]} ${styles["main-nav__item--cta"]}`}>
            <a href="start-hosting/index.html">Start Hosting</a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
