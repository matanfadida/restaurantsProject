import Cart from "../UI/cart";
import Button from "./button";
import classes from "./chefItem.module.css";

const ChefItem = (props) => {
  return (
    <Cart>
      <div>
        <h1>:הזמנה</h1>
        <h4>מוצרים בהזמנה</h4>
        <div>
          <Button>בהכנה</Button>
          <Button>מוכן</Button>
        </div>
        <ul>
          {props.products.map((product) => (
            <li><div><span>{product.amount} x</span> {product.name}</div></li>
          ))}
        </ul>
        <div>
          <span>מספר שולחן: {props.table}</span>
          <span>מחיר: {props.price}</span>
        </div>
      </div>
    </Cart>
  );
};

export default ChefItem;

// return (
//   <li className={classes.item}>
//     <div className={classes.buttons}>
//       <ul>
//         <li>
//           <Button name="בהכנה"></Button>
//         </li>
//         <li>
//           <Button name="מוכן"></Button>
//         </li>
//       </ul>
//     </div>
//     <div className={classes.detail}>
//       <h3 className={classes.title}>
//         {props.amount} * {props.name}
//       </h3>
//       <h4>{props.remark} : הערות</h4>
//       מספר שולחן
//     </div>
//   </li>
// );
