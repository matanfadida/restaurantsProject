import {Fragment} from 'react';
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import classes from "./loader.module.css";

const LoaderAddCookie = () => {
  const portalElment = document.getElementById("loader");
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.tableId);
  Cookies.set("table", JSON.stringify(+params.tableId));
  setTimeout(()=>{
    navigate("/");
  },[1])

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classes["backdrop"]}>
          <div className={classes["lds-spinner"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>,
        portalElment
      )}
    </Fragment>
  );
};

export default LoaderAddCookie;
