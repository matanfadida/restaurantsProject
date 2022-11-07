import { useContext } from "react";
import CartContext from "../../../state/buy-context";
import Modal from "../../UI/modal";

import style from "./Cart.module.css";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const totalAmount = `${ctx.totalAmount.toFixed(2)}₪`;
  const hashItem = ctx.items.length > 0;
  return (
    <Modal>
      <ul>{ctx.items.map(item => (<li>{item.name}</li>))}</ul>
      <div className={style["div-show-price"]}>
        <span>{totalAmount}</span>
        <span className={style["div_span"]}> :סה"כ לתשלום</span>
      </div>
      <div>
        <button className={style.btn} onClick={ctx.cartShowhandler}>
          סגור
        </button>
        {hashItem && <button className={style["btn_ord"]}>! הזמן</button>}
      </div>
    </Modal>
  );
};

export default Cart;
