import classes from "./EmailForm.module.css";
import useInput from "../hooks/use-input";
import { Prompt } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const isNotEmpty = (value) => value.trim() !== "";
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const EmailForm = () => {
  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: titleReset,
  } = useInput(isNotEmpty);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isValidEmail);

  const {
    value: msgValue,
    isValid: msgIsValid,
    hasError: msgHasError,
    valueChangeHandler: msgChangeHandler,
    inputBlurHandler: msgBlurHandler,
    reset: msgReset,
  } = useInput(isNotEmpty);

  const resetForm = () => {
    msgReset();
    emailReset();
    nameReset();
    titleReset();
  };

  let formIsValid = false;

  if (msgIsValid && emailIsValid && nameIsValid && titleIsValid) {
    formIsValid = true;
  }

  let isEntering = false;
  if (msgIsValid || emailIsValid || nameIsValid || titleIsValid) {
    isEntering = true;
  }

  const sendEmail = async(event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const response = await fetch("/api/email/send-email", {
      method: "POST",
      body: JSON.stringify({
        name: 'בדיקה', 
        email:'בדיקה',
        subject:'בדיקה',
        message:'בדיקה'
      }),
      headers: { "Content-Type": "application/json" },
    });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      console.log(result);
    ///ToDO BACK
    resetForm();
  };

  const titleNameClasses = titleHasError ? "invalid" : "valid";
  const nameNameClasses = nameHasError ? "invalid" : "valid";
  const emailNameClasses = emailHasError ? "invalid" : "valid";
  const msgNameClasses = msgHasError ? "invalid" : "valid";

  return (
    <div className={classes.main}>
      <h1>ספרו לנו על החוויה שלכם במסעדה</h1>
      <form id="email_form" onSubmit={sendEmail}>
        {/* <Prompt
          message="Are you sure tou eant to leave? All your entered data will be lost!"
          when={isEntering}
        /> */}
        <div className={classes[titleNameClasses]}>
          {titleHasError && (
            <p className={classes.error_text}>חייב להכניס כותרת להודעה</p>
          )}
          <input
            type="text"
            name="title"
            placeholder=" כותרת"
            value={titleValue}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          ></input>
        </div>
        <div className={classes[nameNameClasses]}>
          {nameHasError && (
            <p className={classes.error_text}>נא להכניס שם ושם משפחה</p>
          )}
          <input
            type="text"
            name="name"
            placeholder=" שם ושם משפחה"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          ></input>
        </div>
        <div className={classes[emailNameClasses]}>
          {emailHasError && (
            <p className={classes.error_text}>חובה להכניס אימייל תקין</p>
          )}
          <input
            type="text"
            name="user_email"
            placeholder=" אימייל"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          ></input>
        </div>
        <div className={classes[msgNameClasses]}>
          {msgHasError && (
            <p className={classes.error_text}>נא להכניב את ההודעה שברצונך להשאיר</p>
          )}
          <textarea
            name="message"
            placeholder="שתפו אותנו בחווית המסעדה שלכם "
            value={msgValue}
            onChange={msgChangeHandler}
            onBlur={msgBlurHandler}
          ></textarea>
        </div>
        <button
          disabled={!formIsValid}
          type="submit"
          onClick={() => (isEntering = false)}
        >
          Send
        </button>
      </form>
    </div>
  );
};
export default EmailForm;
