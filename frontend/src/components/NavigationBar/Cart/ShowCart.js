import { useContext, useState } from "react";
import CartContext from "../../../state/buy-context";
import Modal from "../../UI/modal";

import style from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [statusOfOrder, setStatusOfOrder] = useState(false);
  // const totalAmount = `${Number(ctx.totalAmount).toFixed(2)}₪`;
  const totalAmount = Number(ctx.totalAmount).toFixed(2);

  const hashItem = ctx.items.length > 0;
  const sendOrder = async () => {
    const response = await fetch("/api/add-order", {
      method: "POST",
      body: JSON.stringify({
        numberTable: 1,
        price: Number(totalAmount),
        products: ctx.itemsToBack,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const result = await response.json();

    if (result === "ok") {
      setStatusOfOrder(true);
      ctx.RemoveAll();
    }
  };

  if(statusOfOrder){
    return (
      <Modal>
       <div>
        <span>הזמנה התבצע בהצלחה !</span>
        </div>
        <div>
          <button className={style.btn} onClick={ctx.cartShowhandler}>
            סגור
          </button>
        </div>
      </Modal>
    );
  }
  // console.log(ctx.itemsToBack);
  return (
    <Modal>
      <ul className={style["ul-cart"]}>
        {ctx.items.map((item) => (
          <CartItem
            guid_id={item.guid_id}
            key={item.id}
            id={item.id}
            name={item.name}
            detail={item.detail}
            price={+item.price}
            amount={+item.amount}
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
