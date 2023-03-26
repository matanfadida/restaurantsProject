import { useState } from "react";
import Cart from "../../UI/cart";
import classes from "./admin-login.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isBiggerThenZero = (value) => value > 0;

const Login = () => {
  const defaultValue = {
    value: "",
    isValid: false,
    blur: false,
  };
  const [user, setUser] = useState(defaultValue);

  const [pass, setPass] = useState(defaultValue);

  let formIsValid = false;

  if (pass.isValid && user.isValid) {
    formIsValid = true;
  }

  const userChangeHangler = (event) => {
    setUser({
      value: event.target.value,
      isValid: isNotEmpty(event.target.value),
    });
  };

  const passChangeHangler = (event) => {
    setPass({
      value: event.target.value,
      isValid: isNotEmpty(event.target.value),
    });
  };

  const passBlurHangler = (event) => {
    setPass({
      ...pass,
      blur: true,
    });
  };

  const userBlurHangler = (event) => {
    setUser({
      ...user,
      blur: true,
    });
  };

  const loginHandler = () => {};

  const nameUserClasses = !user.isValid && user.blur? "invalid" : "valid";
  const namePassClasses = !pass.isValid && pass.blur? "invalid" : "valid";

  return (
    <Cart className={classes.main}>
      <form className={classes.form} onSubmit={loginHandler}>
        <div className={classes[nameUserClasses]}>
          {!user.isValid && user.blur &&(
            <p className={classes.error_text}>נא להכניס שם משתמש תקין</p>
          )}
          <input
            type="text"
            name="user"
            placeholder="שם מתשמש"
            onChange={userChangeHangler}
            onBlur={userBlurHangler}
          ></input>
        </div>

        <div className={classes[namePassClasses]}>
          {!pass.isValid && pass.blur &&(
            <p className={classes.error_text}>נא להכניס סיסמא</p>
          )}
          <input
            type="text"
            name="user"
            placeholder="סיסמא"
            onChange={passChangeHangler}
            onBlur={passBlurHangler}
          ></input>
        </div>

        <div className={classes.div}>
          <button type="submit" disabled={!formIsValid}>
            התחבר
          </button>
        </div>
      </form>
    </Cart>
  );
};

export default Login;
