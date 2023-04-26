import EmailForm from "../components/Admin/EmailForm";
import { BsPhoneVibrate } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import classes from "./contact.module.css";
import { useState } from "react";

const Contact = () => {
  const [detail, setdetail] = useState({phone:"08-659-5698", addres:"המכבים 54"});
  //מתן להוציא את הנתונים מהבסיס נתונים כתובת ומספר טלפון

  return (
    <div>
      <div className={classes.contact}>
        <h3></h3>
        <GoLocation size="50px"/>
        <h3>{detail.addres}</h3>
      </div>
      <div className={classes.contact}>
        <h3>צרו איתנו קשר</h3>
        <BsPhoneVibrate size="50px" />
        <h3>{detail.phone}</h3>
      </div>
      <EmailForm></EmailForm>
    </div>
  );
};

export default Contact;
