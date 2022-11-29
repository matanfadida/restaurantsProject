import { useContext } from "react";
import CartContext from "../../../state/buy-context";
import style from "./CartItem.module.css";

const CartItem = (props) => {
  const ctx = useContext(CartContext);

  const AddToCartHanlder = () => {
    ctx.AddItem({
      id: props.id,
      name: props.name,
      detail: props.detail,
      price: props.price,
      amount: props.amount,
      remark: props.remark,
    })
  }

  const RemoveItemFromCartHandler = () => {
    ctx.RemoveItem(props.id)
  }

  return (
    <li className={style["cart-item"]}>
      <div>
          <h2>{props.name}</h2>
          <div className={style.summary}>
            <span className={style.price}>{`${props.price.toFixed(2)}₪`}</span>
            <span className={style.amount}>{`x${props.amount}`}</span>
          </div>
        <div className={style.actions}>
          <button onClick={RemoveItemFromCartHandler}>-</button>
          <button onClick={AddToCartHanlder}>+</button>
        </div>
        <span>{props.remark}</span>
      </div>
    </li>
  );
};

export default CartItem;