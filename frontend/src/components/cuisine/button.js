import { useState } from "react";
import classes from "./button.module.css"

const Button = (props) => {
    const [isClicked, setIsClicked] = useState(false)

    const clickHandler = event =>{
        const temp = !isClicked
        setIsClicked(temp)
    }

    const buttonNameClass = isClicked ? "button_clicked" : "button"

  return <button onClick={clickHandler} className={classes[buttonNameClass]}>{props.children}</button>;
};

export default Button;
