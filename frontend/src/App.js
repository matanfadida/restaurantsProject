import { Fragment, useContext } from "react";
import Home from "./components/Home";
import Cart from "./components/NavigationBar/Cart/ShowCart";
import NavigationBar from "./components/NavigationBar/nav-bar";
import CartContext from "./state/buy-context";

const App = () => {
  const ctx = useContext(CartContext);
  return (
    <Fragment>
      {ctx.cartShow && <Cart/>}
      <NavigationBar />
      <Home />
    </Fragment>
  );
};

export default App;
