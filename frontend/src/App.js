import { Fragment, useContext } from "react";
import Home from "./components/Home";
import Error404 from "./components/error404";
import Cart from "./components/NavigationBar/Cart/ShowCart";
import CartContext from "./state/buy-context";
import { Routes, Route, Navigate } from "react-router-dom";
import Chef from "./components/cuisine/chef";
import AdminHome from "./components/Admin/Home";
import AddProduct from "./components/Admin/Poduct/add-product";
import Tables from "./components/Table/Tables";
import TableDetail from "./components/Table/TableDetail";
import Header from "./components/NavigationBar/MainHeader/Header";
import Login from "./components/Admin/Login/admin-login";
import Meal from "./pages/mealPage";
import Rate from "./components/Rating/rate";
import AddCategory from "./components/Admin/Poduct/add-category";
import Loader from "./components/UI/loader";
import Contact from "./pages/contact";
import EditContact from "./components/Admin/EditContact";
import Footer from "./components/NavigationBar/footer/Footer";

const App = () => {
  const ctx = useContext(CartContext);

  if (ctx.isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Header />
      {ctx.cartShow && <Cart />}
      <div style={{marginTop:"70px", marginBottom:"70px"}}>
        <Routes>
          <Route path="/chef" element={<Chef />} />
          <Route path="/product/:productId" element={<Meal />} />
          <Route path="/rate/:productId" element={<Rate />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/table/:tableId"
            element={
                <TableDetail />
              
            }
          />
          <Route
            path="/admin/add-product"
            element={
              ctx.isLogged ? (
                <AddProduct />
              ) : (
                <Navigate replace to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/contact"
            element={
              ctx.isLogged ? (
                <EditContact />
              ) : (
                <Navigate replace to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/edit-product/:productId"
            element={
              ctx.isLogged ? (
                <AddProduct />
              ) : (
                <Navigate replace to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/tables"
            element={
              ctx.isLogged ? <Tables /> : <Navigate replace to="/admin/login" />
            }
          />
          <Route
            path="/admin/tables/:tableId"
            element={
              ctx.isLogged ? (
                <TableDetail />
              ) : (
                <Navigate replace to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/login"
            element={
              ctx.isLogged ? <Navigate replace to="/admin" /> : <Login />
            }
          />
          <Route
            path="/admin/add-category"
            element={
              ctx.isLogged ? (
                <AddCategory />
              ) : (
                <Navigate replace to="/admin/login" />
              )
            }
          />
          <Route path="/admin/signup" element={<Login />} />
          <Route
            path="/admin"
            element={
              ctx.isLogged ? (
                <AdminHome />
              ) : (
                <Navigate replace to="/admin/login" />
              )
            }
          />
          <Route path="/:restaurantName/:tableId" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
      <Footer/>
    </Fragment>
  );
};

export default App;
