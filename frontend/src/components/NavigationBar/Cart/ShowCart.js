import { useContext } from "react";
import CartContext from "../../../state/buy-context";
import Modal from "../../UI/modal";

import style from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const totalAmount = `${Number(ctx.totalAmount).toFixed(2)}₪`;
  console.log('asd',ctx.items);
  const hashItem = ctx.items.length > 0;
  const sendOrder = async () => {
    await fetch("/api/add-order", {
      method: "POST",
      body: JSON.stringify({
        numberTable: 1,
        price: totalAmount,
        products: ctx.items,
      }),
      headers: { "Content-Type": "application/json" },
    }).catch((err) => console.log(err));

    ctx.RemoveAll();
  };

  return (
    <Modal>
      <ul className={style["ul-cart"]}>
        {ctx.items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            detail={item.detail}
            price={Number(item.price)}
            amount={item.amount}
            remark={item.remark}
          />
        ))}
      </ul>
      <div className={style["div-show-price"]}>
        <span>{totalAmount}</span>
        <span className={style["div_span"]}> :סה"כ לתשלום</span>
      </div>
      <div>
        <button className={style.btn} onClick={ctx.cartShowhandler}>
          סגור
        </button>
        {hashItem && (
          <button onClick={sendOrder} className={style["btn_ord"]}>
            ! הזמן
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
