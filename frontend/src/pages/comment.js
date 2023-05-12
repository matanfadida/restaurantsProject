import classes from "./mealPage.module.css";
import { AiFillMinusCircle } from "react-icons/ai";
import CartContext from "../state/buy-context";
import { useContext } from "react";

const date = new Date();
//תוסיף לפה את התאריך אחרי שאתה שומר אותו בבסיס נתונים ברגע שמישהו מוסיף

const Comment = (props) => {
  const ctx = useContext(CartContext);

  const deleteHandler = (id) => {
    console.log("למחוק מהבאק ", id);
    //למחוק מהבאק
    //תבדוק במיל פייג מה השם של האיידי
  };

  return (
    <div className={classes.comment}>
      {ctx.isLogged && (
        <div className={classes.delete}
          onClick={() => {
            deleteHandler(props.key);
          }}
        >
          <AiFillMinusCircle />
        </div>
      )}
      <div>
        <span>{date.toLocaleDateString()}</span>
        <p>{props.comment}</p>
      </div>
    </div>
  );
};
export default Comment;
