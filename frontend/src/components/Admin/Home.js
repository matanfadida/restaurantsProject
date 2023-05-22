import { useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "../UI/cart";
import './Home.css'

const AdminHome = () => {
  return (
    
     
      <ul className="ul">
        <li>
          <Link to="/admin/add-product">הוסף לתפריט</Link>
        </li>
        <li>
          <Link to="/admin/add-category">הוסף קטגוריה</Link>
        </li>
        <li>
          <Link to="/admin/tables">שולחנות</Link>
        </li>
        <li>
          <Link to="/admin/contact">עדכן פרטי מסעדה </Link>
        </li>
        <li>
          <Link to="/admin/add-table"> הוסף שולחן</Link>
        </li>
      </ul>
    
  );
};

export default AdminHome;
