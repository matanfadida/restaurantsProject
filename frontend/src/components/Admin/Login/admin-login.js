import { useState, useEffect, useContext } from "react";
import Cart from "../../UI/cart";
import classes from "./admin-login.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import CartContext from "../../../state/buy-context";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const isNotEmpty = (value) => value.trim() !== "";
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const Login = () => {
  const defaultValue = {
    value: "",
    isValid: false,
    blur: false,
  };

  const ctx = useContext(CartContext);
  const [email, setEmail] = useState(defaultValue);
  const [pass, setPass] = useState(defaultValue);
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("signup")) {
      setSignup(true);
    }
  }, [location.pathname]);

  let formIsValid = false;
  if (pass.isValid && email.isValid) {
    formIsValid = true;
  }

  const emailChangeHangler = (event) => {
    setEmail({
      ...email,
      value: event.target.value,
      isValid: isValidEmail(event.target.value),
    });
  };

  const passChangeHandler = (event) => {
    setPass({
      ...pass,
      value: event.target.value,
      isValid: isNotEmpty(event.target.value),
    });
  };

  const passBlurHandler = (event) => {
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

    if (signup) {
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify({
          email: email.value,
          password: pass.value,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      if (result === "ok") {
        navigate("/admin/login", { replace: true });
      } else {
        navigate("/admin/signup", { replace: true });
        console.log("error");
      }
      return;
    }
    const response = await fetch(`/api/auth`, {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: pass.value,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    const result = await response.json();
    console.log(result);
    if (result === "succeeded") {
      ctx.setIsLoggedHandler(true);
      navigate("/admin", { replace: true });
    } else {
      navigate("/admin/login", { replace: true });
      console.log("error");
    }
  };

  const emailClasses = !email.isValid && email.blur;
  const passClasses = !pass.isValid && pass.blur;

  return (
    <form className={classes.form} onSubmit={AccountHandler}>
      <h1>Admin Login</h1>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <TextField
          error={emailClasses}
          label="Email"
          helperText={emailClasses && "please enter a valid email"}
          value={email.value}
          onChange={emailChangeHangler}
          onBlur={emailBlurHandler}
          type="email"
        />

        <TextField
          error={passClasses}
          label="Password"
          helperText={passClasses && "please enter password"}
          value={pass.value}
          onChange={passChangeHandler}
          onBlur={passBlurHandler}
          type="password"
        />
      </Box>
      <Button
        variant="outlined"
        type="submit"
        size="small"
        sx={{ m: "auto", mt: 2, width: 200 }}
        disabled={!formIsValid}
      >
        התחבר
      </Button>
    </form>
  );
};

export default Login;
