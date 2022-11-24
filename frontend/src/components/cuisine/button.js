import classes from "./button.module.css"

const Button = (props) => {
  return <button className={classes.button}>{props.name}</button>;
};

export default Button;
