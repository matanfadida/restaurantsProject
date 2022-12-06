import { Link, Route, Routes } from "react-router-dom";
import Cart from "../UI/cart";
import AddProduct from "./Poduct/add-product";

const AdminHome = () => {
  return (
    <Cart>
      <h1>! ברוכים הבאים</h1>
      <ul>
        <li>
          <Link to="/admin/add-product">הוסף לתפריט</Link>
        </li>
        <li>
          <Link to="/admin/tables">שולחנות</Link>
        </li>
      </ul>
    </Cart>
  );
};

export default AdminHome;
