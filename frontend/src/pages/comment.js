import classes from "./mealPage.module.css";
import { AiFillMinusCircle } from "react-icons/ai";
import CartContext from "../state/buy-context";
import { useContext, useState } from "react";
import Loader from "../components/UI/loader";

const date = new Date();
//תוסיף לפה את התאריך אחרי שאתה שומר אותו בבסיס נתונים ברגע שמישהו מוסיף

const Comment = (props) => {
  const ctx = useContext(CartContext);
  const [loader, setLoader] = useState(false);

  const deleteHandler = (id) => {
    setLoader(true)
    fetch(`/api/admin/delete-comment`, {
      method: "post",
      body: JSON.stringify({
        id
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      }).then(data => {
        if(data === 'ok'){
          window.location.reload();
        }
      })
      .catch((err) => setLoader(false));
    // console.log("למחוק מהבאק ", id);
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className={classes.comment}>
      {ctx.isLogged && (
        <div className={classes.delete}
          onClick={() => {
            deleteHandler(props.id);
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
