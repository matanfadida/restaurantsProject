import { useContext, useState } from "react";
import CartContext from "../../../state/buy-context";
import Modal from "../../UI/modal";
import Cookies from "js-cookie";

import style from "./Cart.module.css";
import CartItem from "./CartItem";
import { fetchProductFromCookie } from "../../Helper/productHelp";
import Loader from "../../UI/loader";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [statusOfOrder, setStatusOfOrder] = useState(false);
  const [loader, setLoader] = useState(false);
  // const totalAmount = `${Number(ctx.totalAmount).toFixed(2)}₪`;
  const totalAmount = Number(ctx.totalAmount).toFixed(2);

  const hashItem = ctx.items.length > 0;
  const sendOrder = async () => {
    setLoader(true);
    let products = [];
    let sum = 0;
    await fetchProductFromCookie().then(
      ({ newArrayItems, updateTotalAmount }) => {
        products = newArrayItems;
        sum = updateTotalAmount;
      }
    );
    const response = await fetch("/api/add-order", {
      method: "POST",
      body: JSON.stringify({
        numberTable: JSON.parse(Cookies.get("table")),
        price: sum,
        products: products,
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
      window.location.reload();
    }
    setLoader(false);
  };

  if (statusOfOrder) {
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

  if (loader) {
    return <Loader />;
  }
  // console.log(ctx.itemsToBack);
  return (
    <Modal>
      <ul className={style["ul-cart"]}>
        {ctx.items.map((item) => (
          <CartItem
            guid_id={item.guid_id}
            key={item.guid_id}
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
