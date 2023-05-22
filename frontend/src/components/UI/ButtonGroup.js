import classes from "./Button.module.css";
import { useState } from "react";

const ButtonGroup = (props) => {
  const [focus, setFocus] = useState(props.focus);

  const buttonClassName = (id) => {
    const className = focus === id ? "clicked" : "notClicked";
    return classes[className];
  };
  const clickHandler = (event, id, onClick) => {
    setFocus(id);
    onClick();
  };

  const buttons = props.buttons.map((item) => (
    <button
      key={item.id}
      name={item.name}
      className={buttonClassName(item.id)}
      onClick={(event) => clickHandler(event, item.id, item.onClick)}
    >
      {item.name}
    </button>
  ));

  return <div className={classes.button}>{buttons}</div>;
};

export default ButtonGroup;
