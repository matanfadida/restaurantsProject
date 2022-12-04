import { Link, Route, Routes } from "react-router-dom";
import Cart from "../UI/cart";
import AddProduct from "./Poduct/add-product";

const AdminHome = () => {
  return (
    <Cart>
      <h1>! ברוכים הבאים</h1>
      <Link to="/admin/add-product">הוסף לתפריט</Link>
      
    </Cart>
  );
};

export default AdminHome;
