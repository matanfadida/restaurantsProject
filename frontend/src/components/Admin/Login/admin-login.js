import { useState, useEffect} from "react";
import Cart from "../../UI/cart";
import classes from "./admin-login.module.css";
import { useNavigate, useLocation } from "react-router-dom";


const isNotEmpty = (value) => value.trim() !== "";
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const Login = () => {
  const defaultValue = {
    value: "",
    isValid: false,
    blur: false,
  };

  const [email, setEmail] = useState(defaultValue);
  const [pass, setPass] = useState(defaultValue);
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    if(location.pathname.includes('signup')){
      setSignup(true);
    }
  }, [location.pathname])

  let formIsValid = false;

  if (pass.isValid && email.isValid) {
    formIsValid = true;
  }

  const emailChangeHangler = (event) => {
    setEmail({
      value: event.target.value,
      isValid: isValidEmail(event.target.value),
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

  const emailBlurHandler = (event) => {
    setEmail({
      ...email,
      blur: true,
    });
  };

  const AccountHandler = async (e) => {
    e.preventDefault();

    if(signup){
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          email: email.value,
          password: pass.value
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      if(result === 'ok'){
        navigate('/admin/login', { replace: true });
      }else{
        navigate('/admin/signup', { replace: true });
        console.log('error');
      }
      return;
    }
    const response = await fetch(`/api/auth`, {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: pass.value
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const result = await response.json();
    console.log(result);
    if(result === 'succeeded'){
      navigate('/admin', { replace: true });
    }else{
      navigate('/admin/login', { replace: true });
      console.log('error');
    }
  }

  const nameUserClasses = !email.isValid && email.blur? "invalid" : "valid";
  const namePassClasses = !pass.isValid && pass.blur? "invalid" : "valid";

  return (
    <Cart className={classes.main}>
      <form className={classes.form} onSubmit={AccountHandler}>
        <div className={classes[nameUserClasses]}>
          {!email.isValid && email.blur &&(
            <p className={classes.error_text}>נא להכניס שם משתמש תקין</p>
          )}
          <input
            type="email"
            name="user"
            placeholder="שם מתשמש"
            onChange={emailChangeHangler}
            onBlur={emailBlurHandler}
          ></input>
        </div>

        <div className={classes[namePassClasses]}>
          {!pass.isValid && pass.blur &&(
            <p className={classes.error_text}>נא להכניס סיסמא</p>
          )}
          <input
            type="password"
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
