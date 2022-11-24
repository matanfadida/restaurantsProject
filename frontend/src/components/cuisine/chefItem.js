import Button from "./button";
import classes from "./chefItem.module.css";

const ChefItem = (props) => {
  return (
    <li className={classes.item}>
      <div className={classes.buttons}>
        <ul>
          <li>
            <Button name="בהכנה"></Button>
          </li>
          <li>
            <Button name="מוכן"></Button>
          </li>
        </ul>
      </div>
      <div className={classes.detail}>
        <h3 className={classes.title}>
          {props.amount} * {props.name}
        </h3>
        <h4>{props.remark} : הערות</h4>
        מספר שולחן
      </div>
    </li>
  );
};

export default ChefItem;
