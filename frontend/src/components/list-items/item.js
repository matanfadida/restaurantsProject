import { useContext, useState } from "react";
import CartContext from "../../state/buy-context";
import classes from "./item.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ImPlus, ImMinus } from "react-icons/im";
import { BiRestaurant } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

const Item = (props) => {
  const navigate = useNavigate();
  const ctx = useContext(CartContext);
  const [remark, setRemark] = useState("");
  const [amount, setAmount] = useState(1);

  const buttonAddItemHanlder = () => {

    for(var i = 0; i < +amount; i++){
      ctx.AddItem({
        id: props.id,
        guid_id: uuidv4(),
        name: props.name,
        detail: props.detail,
        price: props.price,
        remark: remark,
        amount: 1,
        status:"נשלח לטבח",
      });
    }
    // ctx.AddItem({
    //   id: props.id,
    //   guid_id: uuidv4(),
    //   name: props.name,
    //   detail: props.detail,
    //   price: props.price,
    //   remark: remark,
    //   amount: +amount,
    //   status:"נשלח לטבח",
    // });

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
      <Link to={`/product/${props.id}`} className={classes.nodeco}>
        <div className={classes.item}>
            <div className={classes["div__img"]}>
              <img className={classes.img} src={props.img} alt={props.name} />
            </div>
            <div className={classes.right}>
              <h3>{props.name}</h3>
              <h3>{`${props.price}₪`}</h3>
            </div>

            {ctx.isLogged && (
              <div>
                <button onClick={deleteHandler}>מחיקה</button>

                <Link to={`/admin/edit-product/${props.id}`}>עריכה</Link>
              </div>
            )}
          </div>
      </Link>
    </li>
  );
};

export default Item;
