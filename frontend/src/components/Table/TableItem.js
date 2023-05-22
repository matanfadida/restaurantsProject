import classes from "./tableItem.module.css";
import { NavLink } from "react-router-dom";

const TableItem = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes.title}>
        <h1>שולחן {props.table}</h1>
      </div>
    
      <NavLink to={`./${props.table}`}>פירוט הזמנה</NavLink>
      <h4>סה"כ מחיר הזמנה : {props.totalPrice}₪ </h4>
      <h4>שולם: {props.paid}₪ </h4>
      <h4>נותר לשלם: {props.totalPrice - props.paid}₪ </h4>
    </div>
  );
};




export default TableItem;
