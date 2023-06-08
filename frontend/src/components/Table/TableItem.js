import { useEffect, useState } from "react";
import classes from "./tableItem.module.css";
import { NavLink } from "react-router-dom";

const TableItem = (props) => {
  const [payed, setPayed] = useState(0); 
  const [tip, setTip] = useState(0); 

  const handlerCloseTable = async() => {
    const response = await fetch(`/api/admin/delete-table`, {
      method: "post",
      body: JSON.stringify({
        numberTable: props.table,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const result = await response.json();
    console.log('sda')
  }

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
        setPayed(result.sum);
        setTip(result.tip)
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
      <h4>טיפ : {tip}₪ </h4>
      <button onClick={handlerCloseTable}>סגור שולחן</button>
    </div>
  );
};




export default TableItem;
