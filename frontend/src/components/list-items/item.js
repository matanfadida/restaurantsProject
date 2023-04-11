import { useContext, useState } from "react";
import CartContext from "../../state/buy-context";
import classes from "./item.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ImPlus, ImMinus } from "react-icons/im";
import { BiRestaurant } from "react-icons/bi";

const Item = (props) => {
  const navigate = useNavigate();
  const ctx = useContext(CartContext);
  const [remark, setRemark] = useState("");
  const [amount, setAmount] = useState(1);

  const buttonAddItemHanlder = () => {
    ctx.AddItem({
      id: props.id,
      name: props.name,
      detail: props.detail,
      price: props.price,
      remark: remark,
      amount: +amount,
    });
    setRemark("");
    setAmount(1);
  };

  const plusHanlder = () => {
    const temp = amount + 1;
    setAmount(temp);
  };

  const minusHanlder = () => {
    const temp = amount - 1;
    setAmount(temp);
  };

  const deleteHandler = () => {
    fetch("/api/admin/delete-product", {
      method: "POST",
      body: JSON.stringify({ productId: props.id }),
      headers: { "Content-Type": "application/json" },
    });
    navigate(0);
  };

  const remarkChangeHandler = (event) => {
    setRemark(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  return (
    <li className={classes.glass}>
      <div className={classes.item}>
        <div className={classes.start}>
          <div className={classes["div__img"]}>
            <img className={classes.img} src={props.img} alt={props.name} />
          </div>
          <div className={classes.right}>
            <h3>{props.name}</h3>
            <p>{props.detail}</p>
            <h4>{`${props.price}₪`}</h4>
          </div>
        </div>
        <div>
          <NavLink to={`/product/${props.id}`} className={classes.detail}>
            לחץ לפרטים נוספים
          </NavLink>
        </div>
        <div>
          <input
            className={classes.remark}
            type="text"
            onChange={remarkChangeHandler}
            value={remark}
            placeholder="הערות לטבח"
          ></input>
        </div>
        <div className={classes.div}>
          <div>
            <button
              className={classes.plus_button}
              onClick={buttonAddItemHanlder}
            >
              הוסף
              <BiRestaurant />
            </button>
            <button className={classes.plus_button} onClick={plusHanlder}>
              <ImPlus />
            </button>
            <input
              className={classes.amount}
              value={amount}
              type="number"
              min={0}
              onChange={amountChangeHandler}
            ></input>
            <button className={classes.plus_button} onClick={minusHanlder}>
              <ImMinus />
            </button>
          </div>
          {ctx.isLogged && (
            <div>
              <button onClick={deleteHandler}>מחיקה</button>

              <NavLink to={`/admin/edit-product/${props.id}`}>עריכה</NavLink>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Item;
