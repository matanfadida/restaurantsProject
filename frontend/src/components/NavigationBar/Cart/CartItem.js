import style from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <li className={style["cart-item"]}>
      <div>
          <h2>Sushi</h2>
          <div className={style.summary}>
            <span ClassName={style.price}>$22.99</span>
            <span className={style.amount}>x 1</span>
          </div>
        <div className={style.actions}>
          <button>-</button>
          <button>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;