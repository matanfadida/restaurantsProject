import classes from "./mealPage.module.css";

const date = new Date();
//תוסיף לפה את התאריך אחרי שאתה שומר אותו בבסיס נתונים ברגע שמישהו מוסיף

const Comment = (props) => {
  return (
    <div className={classes.comment}>
      <span>{date.toLocaleDateString()}</span>
      <p>{props.comment}</p>
    </div>
  );
};
export default Comment;
