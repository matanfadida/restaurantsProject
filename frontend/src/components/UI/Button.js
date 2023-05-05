import classes from "./Button.module.css";
import { useState } from "react";

const Button = (props) => {
  const [clicked, setClicked] = useState(false);
  const className = clicked ? "clicked" : "notClicked"
  const clickHandler = () =>{
    const temp = !clicked
    setClicked(temp)
    props.onClick();
  }
  return <button onClick={clickHandler} className={classes[className]}>{props.children}</button>;
};

export default Button;
