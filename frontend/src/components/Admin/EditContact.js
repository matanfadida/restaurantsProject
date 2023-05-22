import { useEffect, useState } from "react";
import useInput from "../hooks/use-input";
import { useNavigate } from "react-router-dom";
import classes from "./EmailForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isValidnumber = (num) =>
  isNotEmpty(num) && (/^\d{10}$/.test(num) || /^\d{8}$/.test(num));

const urlPattern = new RegExp(
  "(?:https?)://(w+:?w*)?(S+)(:d+)?(/|/([w#!:.?+=&%!-/]))?"
);
export const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + 
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" + 
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + 
      "(\\?[;&a-z\\d%_.~+=-]*)?" + 
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); 
  return !!urlPattern.test(urlString);
};
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const EditContact = () => {
  const [detail, setdetail] = useState(null);
  const navigate = useNavigate();

  const {
    value: numberValue,
    isValid: numberValid,
    hasError: numberError,
    valueChangeHandler: numberChangeHandler,
    inputBlurHandler: numberBlurHandler,
    reset: numberReset,
    defaultValue: numberDefault,
  } = useInput(isValidnumber);

  const {
    value: addressValue,
    isValid: addressValid,
    hasError: addressError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressReset,
    defaultValue: addressDefault,
  } = useInput(isNotEmpty);

  const {
    value: instagramValue,
    isValid: instagramValid,
    hasError: instagramError,
    valueChangeHandler: instagramChangeHandler,
    inputBlurHandler: instagramBlurHandler,
    reset: instagramReset,
    defaultValue: instagramDefault,
  } = useInput(isValidUrl);

  const {
    value: facebookValue,
    isValid: facebookValid,
    hasError: facebookError,
    valueChangeHandler: facebookChangeHandler,
    inputBlurHandler: facebookBlurHandler,
    reset: facebookReset,
    defaultValue: facebookDefault,
  } = useInput(isValidUrl);

  const {
    value: emailValue,
    isValid: emailValid,
    hasError: emailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
    defaultValue: emailDefault,
  } = useInput(isValidEmail);

  //למשוך את הנתונים שכבר יש בבסיס נתונים ולעשות set
  useEffect(() => {
    const fetchEmail = async () => {
      const response = await fetch(`/api/details/get-details`);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      if (result != null) {
        setdetail({
          emailValue: result[0].email,
          numberValue: result[0].phone,
          addressValue: result[0].address,
          facebookValue: result[0].facebook,
          instagramValue: result[0].instagram,
        });
        emailDefault(result[0].email);
        numberDefault(result[0].phone);
        addressDefault(result[0].address);
        facebookDefault(result[0].facebook);
        instagramDefault(result[0].instagram);
      }
    };
    fetchEmail().catch((error) => {});
  }, []);

  //למשוך את הנתונים שכבר יש בבסיס נתונים ולעשות set
  const handleSubmit = (e) => {
    e.preventDefault();
    const AddEmail = async () => {
      const response = await fetch("/api/details/add-details", {
        method: "post",
        body: JSON.stringify({
          emailId: detail != null ? detail._id : null,
          email: emailValue,
          phone: numberValue,
          address: addressValue,
          facebook: facebookValue,
          instagram: instagramValue,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      if (result === "ok") {
        navigate("/admin", { replace: true });
      }
    };
    AddEmail().catch((error) => {});

    addressReset();
    numberReset();
    facebookReset();
    instagramReset();
    emailReset();
  };
  let formIsValid = false;

  if (
    addressValid &&
    numberValid &&
    emailValid &&
    facebookValid &&
    instagramValid
  ) {
    formIsValid = true;
  }

  const addressNameClasses = addressError ? "invalid" : "valid";
  const numberNameClasses = numberError ? "invalid" : "valid";
  const emailNameClasses = emailError ? "invalid" : "valid";
  const instagramNameClasses = instagramError ? "invalid" : "valid";
  const facebookNameClasses = facebookError ? "invalid" : "valid";

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
            <p className={classes.error_text}>נא להכניס אימייל לקבלת מיילים </p>
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
        <div className={classes[instagramNameClasses]}>
          {instagramError && (
            <p className={classes.error_text}>
              נא להכניס כתובת לאתר האינסטגרם{" "}
            </p>
          )}
          <input
            type="url"
            id="instagram"
            placeholder=" דף האינסטגרם"
            value={instagramValue}
            onChange={instagramChangeHandler}
            onBlur={instagramBlurHandler}
          ></input>
        </div>
        <div className={classes[facebookNameClasses]}>
          {facebookError && (
            <p className={classes.error_text}>נא להכניס כתובת לאתר הפייסבוק </p>
          )}
          <input
            type="url"
            id="facebook"
            placeholder=" דף הפייסבוק"
            value={facebookValue}
            onChange={facebookChangeHandler}
            onBlur={facebookBlurHandler}
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
