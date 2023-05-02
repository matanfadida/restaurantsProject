import useInput from "../hooks/use-input";
import classes from "./EmailForm.module.css"

const isNotEmpty = (value) => value.trim() !== "";
const isValidnumber = (num) => isNotEmpty(num) && (/^\d{10}$/.test(num) || /^\d{8}$/.test(num));

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

  //למשוך את הנתונים שכבר יש בבסיס נתונים ולעשות set
  const handleSubmit = () => {
    console.log("matan klipush") //להוסיף לבסיס נתונים את ההפרטים החדשים
      //לחזור לדף אדמין
    addressReset();
    numberReset();
  }
  let formIsValid = false;

  if (addressValid && numberValid) {
    formIsValid = true;
  }

  const addressNameClasses = addressError ? "invalid" : "valid";
  const numberNameClasses = numberError ? "invalid" : "valid";

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

        <button type="submit" disabled={!formIsValid} > עדכן</button>
      </form>
    </div>
  );
};

export default EditContact;