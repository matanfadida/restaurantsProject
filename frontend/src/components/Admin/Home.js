import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div>
      

      <h1>! ברוכים הבאים</h1>
      <Link to="/admin/add-product">הוסף לתפריט</Link>
    </div>
  );
};

export default AdminHome;
