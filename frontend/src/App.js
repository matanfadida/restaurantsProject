import { Fragment, useContext } from "react";
import Home from "./components/Home";
import Error404 from "./components/error404";
import Cart from "./components/NavigationBar/Cart/ShowCart";
import CartContext from "./state/buy-context";
import { Routes, Route } from "react-router-dom";
import Chef from "./components/cuisine/chef";
import AdminHome from "./components/Admin/Home";
import AddProduct from "./components/Admin/Poduct/add-product";
import Tables from "./components/Admin/Tables";
import TableDetail from "./components/Admin/TableDetail";
import Header from "./components/NavigationBar/MainHeader/Header";
import Login from "./components/Admin/Login/admin-login"; 

const App = () => {
  const ctx = useContext(CartContext);
  return (
    <Fragment>
      <Header/>
      {ctx.cartShow && <Cart />}
      <Routes>
        <Route path="/chef" element={<Chef />} />
        <Route path="/product/:productId" element />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:productId" element={<AddProduct />} />
        <Route path="/admin/tables" element={<Tables />} />
        <Route path="/admin/tables/:tableId" element={<TableDetail />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/signup" element={<Login />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/:restaurantName/:tableId" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Fragment>
  );
};

export default App;
