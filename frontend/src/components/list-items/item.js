import Cart from "../UI/cart";
import { useContext, useState } from "react";
import CartContext from "../../state/buy-context";
import classes from "./item.module.css";

import { NavLink, Route, useParams } from "react-router-dom";
const Item = (props) => {
  const params = useParams();
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
      amount: amount,
    });
    setRemark("");
    setAmount(1);
   
  };

  const remarkChangeHandler = (event) => {
    setRemark(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  return (
    
    <Cart>
      <li>
        <div className={classes["div__img"]}>
          <img className={classes.img} src={props.img} alt={props.name} />
        </div>
        <div className={classes.div}>
          <div>
            <h3>{props.name}</h3>
            <div>
              <p>{props.detail}</p>
            </div>
            <div>
              <h4>{`${props.price}₪`}</h4>
            </div>
            <input
              className={classes.remark}
              type="text"
              onChange={remarkChangeHandler}
              value={remark}
              placeholder="הערות לטבח"
            ></input>
          </div>
          <button
            className={classes.plus_button}
            onClick={buttonAddItemHanlder}
          >
            +
          </button>
          <input
            className={classes.amount}
            value={amount}
            type="number"
            min={0}
            defaultValue={1}
            onChange={amountChangeHandler}
          ></input>
        </div>
        <NavLink to={`/admin/edit-product/${props.id}`} >עריכה</NavLink>
      </li>
    </Cart>
  );
};

export default Item;
