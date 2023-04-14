import {Fragment} from 'react';
import ReactDOM from 'react-dom';
import classes from "./loader.module.css";

const Loader = () => {
  const portalElment = document.getElementById("loader");

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

export default Loader;
