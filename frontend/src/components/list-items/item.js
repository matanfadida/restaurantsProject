import { useContext, useState } from "react";
import CartContext from "../../state/buy-context";
import classes from "./item.module.css";
import { Link, useNavigate } from "react-router-dom";
import Stars from "../Rating/ratingStar";

const Item = (props) => {
  const navigate = useNavigate();
  const ctx = useContext(CartContext);

  const deleteHandler = () => {
    fetch("/api/admin/delete-product", {
      method: "POST",
      body: JSON.stringify({ productId: props.id }),
      headers: { "Content-Type": "application/json" },
    });
    navigate(0);
  };


  return (
    <li className={classes.li}>
      <Link to={`/product/${props.id}`} className={classes.nodeco}>
        <img className={classes.img} src={props.img} alt={props.name} />

        <div className={classes.details}>
          <span>{`${props.price}₪`}</span>
          <span className={classes.name}>{props.name}</span>
        </div>
        <div className={classes.stars}>
          <Stars
            color="#002D62"
            className={classes.stars}
            value={props.rating}
          />
        </div>
      </Link>
      {ctx.isLogged && (
        <div className={classes.admin}>
          <button onClick={deleteHandler}>מחיקה</button>

          <Link to={`/admin/edit-product/${props.id}`}>עריכה</Link>
        </div>
      )}
    </li>
  );
};

export default Item;
