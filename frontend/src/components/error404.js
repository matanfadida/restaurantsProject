import style from "./error.module.css";
import Cart from "./UI/cart";

const Error404 = () => {
  return (
    <Cart className={style["cart-error"]}>
      <div className={style["main-error"]}>
      <h1 className={style["main-error__h1"]}> 404 Erorr</h1>
        <h3 className={style["main-error__h1"]}>! עמוד לא נמצא</h3>
        <label className={style["main-error__label"]}>חזרה לעמוד הבית</label>
        <a href="/">לחץ פה</a>
      </div>
    </Cart>
  );
};

export default Error404;
