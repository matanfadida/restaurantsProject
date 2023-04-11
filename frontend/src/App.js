import { Fragment, useContext} from "react";
import Home from "./components/Home";
import Error404 from "./components/error404";
import Cart from "./components/NavigationBar/Cart/ShowCart";
import CartContext from "./state/buy-context";
import { Routes, Route, Navigate } from "react-router-dom";
import Chef from "./components/cuisine/chef";
import AdminHome from "./components/Admin/Home";
import AddProduct from "./components/Admin/Poduct/add-product";
import Tables from "./components/Admin/Tables";
import TableDetail from "./components/Admin/TableDetail";
import Header from "./components/NavigationBar/MainHeader/Header";
import Login from "./components/Admin/Login/admin-login"; 
import Meal from "./pages/mealPage";
import Rate from "./components/Rating/rate";
import AddCategory from "./components/Admin/Poduct/add-category";

const App = () => {
  const ctx = useContext(CartContext);

  return (
    <Fragment>
      <Header/>
      {ctx.cartShow && <Cart />}
      <Routes>
        <Route path="/chef" element={<Chef />} />
        <Route path="/product/:productId" element={<Meal/>} />
        <Route path="/rate/:productId" element={<Rate />} />
        <Route path="/admin/add-product" element={ctx.isLogged ? <AddProduct /> : <Navigate replace to="/admin/login" />} />
        <Route path="/admin/edit-product/:productId" element={ctx.isLogged ? <AddProduct /> : <Navigate replace to="/admin/login" />} />
        <Route path="/admin/tables" element={ctx.isLogged ? <Tables /> : <Navigate replace to="/admin/login" />} />
        <Route path="/admin/tables/:tableId" element={ctx.isLogged ? <TableDetail /> : <Navigate replace to="/admin/login" />} />
        <Route path="/admin/login" element={ctx.isLogged ? <Navigate replace to="/admin" /> : <Login />} />
        <Route path="/admin/add-category" element={ctx.isLogged ? <AddCategory /> : <Navigate replace to="/admin/login" />} />
        <Route path="/admin/signup" element={<Login />} />
        <Route path="/admin" element={ctx.isLogged ? <AdminHome /> : <Navigate replace to="/admin/login" />} />
        <Route path="/:restaurantName/:tableId" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Fragment>
  );
};

export default App;
