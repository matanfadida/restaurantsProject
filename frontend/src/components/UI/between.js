import {Fragment} from 'react';
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import classes from "./loader.module.css";
import Loader from './loader';

const LoaderAddCookie = () => {
  // const portalElment = document.getElementById("loader");
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.tableId);
  Cookies.set("table", JSON.stringify(+params.tableId));
  setTimeout(()=>{
    navigate("/");
  },[1])

  return (
    <Loader/>
  );
};

export default LoaderAddCookie;
