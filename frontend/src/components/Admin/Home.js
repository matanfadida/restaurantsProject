import { Link } from "react-router-dom";
import Cart from "../UI/cart";

const AdminHome = () => {
  return (
    <Cart>
      <h1>! ברוכים הבאים</h1>
      <Link to="/admin/add-product">הוסף לתפריט</Link>
    </Cart>
  );
};

export default AdminHome;
