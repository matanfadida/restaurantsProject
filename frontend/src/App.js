import { Fragment, useContext } from "react";
import Home from "./components/Home";
import Error404 from "./components/error404";
import Cart from "./components/NavigationBar/Cart/ShowCart";
import NavigationBar from "./components/NavigationBar/nav-bar";
import CartContext from "./state/buy-context";
import { Routes, Route } from "react-router-dom";
import Chef from "./components/cuisine/chef";
import AdminHome from "./components/Admin/Home";
import AddProduct from "./components/Admin/Poduct/add-product";

const App = () => {
  const ctx = useContext(CartContext);
  return (
    <Fragment>
      {ctx.cartShow && <Cart />}
      <NavigationBar />
  
        <Routes>
          <Route path="/chef" element={<Chef />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/edit-product/:productId" element={<AddProduct />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/:restaurantName/:tableId" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
  
    </Fragment>
  );
};

export default App;
