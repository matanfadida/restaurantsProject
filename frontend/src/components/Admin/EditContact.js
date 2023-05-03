import useInput from "../hooks/use-input";
import classes from "./EmailForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isValidnumber = (num) =>
  isNotEmpty(num) && (/^\d{10}$/.test(num) || /^\d{8}$/.test(num));
const urlPattern = new RegExp(
  "(?:https?)://(w+:?w*)?(S+)(:d+)?(/|/([w#!:.?+=&%!-/]))?"
);
const isValidUrl = (url) => urlPattern.test(url);
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const EditContact = () => {
  const {
    value: numberValue,
    isValid: numberValid,
    hasError: numberError,
    valueChangeHandler: numberChangeHandler,
    inputBlurHandler: numberBlurHandler,
    reset: numberReset,
  } = useInput(isValidnumber);

  const {
    value: addressValue,
    isValid: addressValid,
    hasError: addressError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressReset,
  } = useInput(isNotEmpty);

  const {
    value: instagramValue,
    isValid: instagramValid,
    hasError: instagramError,
    valueChangeHandler: instagramChangeHandler,
    inputBlurHandler: instagramBlurHandler,
    reset: instagramReset,
  } = useInput(isValidUrl);

  const {
    value: facebookValue,
    isValid: facebookValid,
    hasError: facebookError,
    valueChangeHandler: facebookChangeHandler,
    inputBlurHandler: facebookBlurHandler,
    reset: facebookReset,
  } = useInput(isValidUrl);

  const {
    value: emailValue,
    isValid: emailValid,
    hasError: emailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isValidEmail);







  //למשוך את הנתונים שכבר יש בבסיס נתונים ולעשות set
  const handleSubmit = () => {
    console.log("matan klipush"); //להוסיף לבסיס נתונים את ההפרטים החדשים
    //לחזור לדף אדמין
    addressReset();
    numberReset();
  };
  let formIsValid = false;

  if (addressValid && numberValid && emailValid) {
    formIsValid = true;
  }

  const addressNameClasses = addressError ? "invalid" : "valid";
  const numberNameClasses = numberError ? "invalid" : "valid";
  const emailNameClasses = emailError ? "invalid" : "valid";

  return (
    <div className={classes.main}>
      <h1>עדכון פרטי המסעדה</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes[numberNameClasses]}>
          {numberError && (
            <p className={classes.error_text}>נא להכניס מספר תקין</p>
          )}
          <input
            type="tel"
            id="phone"
            placeholder=" מספר טלפון"
            value={numberValue}
            onChange={numberChangeHandler}
            onBlur={numberBlurHandler}
          ></input>
        </div>

        <div className={classes[addressNameClasses]}>
          {addressError && (
            <p className={classes.error_text}>נא להכניס כתובת </p>
          )}
          <input
            type="text"
            id="address"
            placeholder=" כתובת"
            value={addressValue}
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler}
          ></input>
        </div>

        <div className={classes[emailNameClasses]}>
          {emailError && (
            <p className={classes.error_text}>נא להכניס כתובת </p>
          )}
          <input
            type="email"
            id="eamil"
            placeholder=" אימייל"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          ></input>
        </div>

        <button type="submit" disabled={!formIsValid}>
          {" "}
          עדכן
        </button>
      </form>
    </div>
  );
};

export default EditContact;
