import { useEffect, useState } from "react";
import classes from "./tableItem.module.css";
import { NavLink } from "react-router-dom";

const TableItem = (props) => {
  const [payed, setPayed] = useState(0); //למשוך כמה כבר שולם בשולחן הזה

  useEffect(() => {
    const fetchPay = async () => {
        const response = await fetch(`/api/admin/get-payment`, {
          method: "post",
          body: JSON.stringify({
            numTable: props.table,
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Request failed!");
        }
        const result = await response.json();
        console.log("res", result);
        setPayed(result);
    };
    fetchPay()
      .then(() => {})
      .catch((error) => {});
  }, []);
  return (
    <div className={classes.card}>
      <div className={classes.title}>
        <h1>שולחן {props.table}</h1>
      </div>
    
      <NavLink to={`./${props.table}`}>פירוט הזמנה</NavLink>
      <h4>סה"כ מחיר הזמנה : {props.totalPrice}₪ </h4>
      <h4>שולם: {payed}₪ </h4>
      <h4>נותר לשלם: {props.totalPrice - payed}₪ </h4>
    </div>
  );
};




export default TableItem;
