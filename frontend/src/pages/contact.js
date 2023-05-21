import EmailForm from "../components/Admin/EmailForm";
import { BsPhoneVibrate } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import classes from "./contact.module.css";
import { useState, useEffect } from "react";

const Contact = () => {
  const [detail, setdetail] = useState({phone:"", address:""});

  useEffect(() => {
    const fetchEmail = async () => {
      const response = await fetch(`/api/details/get-details`);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      console.log(result);
      setdetail(result[0])
    };
    fetchEmail().catch((error) => {
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.contact}>
        <h3></h3>
        <GoLocation size="50px"/>
        <h3>{detail.address}</h3>
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
