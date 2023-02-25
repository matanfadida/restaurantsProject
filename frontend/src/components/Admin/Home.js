import { useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "../UI/cart";

const AdminHome = () => {
  useEffect(()=>{
    const fetchLogin = async() => {
      const response = await fetch('/api/auth');
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const result = await response.json();
      // setOrders(result);
      // setSearch(result);
      // setLoading(false);
    };
    fetchLogin().catch((error) => {
      // setLoading(false);
      // setHasError(error.message || "Something went wrong!");
    });
  },[]);
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
