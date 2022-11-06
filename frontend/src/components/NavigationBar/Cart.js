import Modal from "../UI/modal";

import style from "./Cart.module.css";

const Cart = (props) => {
  return (
    <Modal>
        {/* list order */}
        <div className={style['div-show-price']}>
            <span>35.56</span>
            <span className={style["div_span"]}> :סכום קניה</span>
        </div>
      <div>
        <button className={style.btn}>סגור</button>
        <button className={style["btn_ord"]}>! הזמן</button>
      </div>
    </Modal>
  );
};

export default Cart;
