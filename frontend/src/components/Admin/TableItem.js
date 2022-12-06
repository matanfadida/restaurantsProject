import classes from "./tableItem.module.css";
import { Link } from "react-router-dom";

const TableItem = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes.title}>
        <h1>שולחן {props.table}</h1>
      </div>
    
      <Link to={`./${props.id}`}>פירוט הזמנה</Link>
      <h4>סה"כ מחיר הזמנה : {props.table}₪ </h4>
      <h4>שולם: {props.paid}₪ </h4>
      <h4>נותר לשלם: {props.totalPrice - props.paid}₪ </h4>
    </div>
  );
};




export default TableItem;
