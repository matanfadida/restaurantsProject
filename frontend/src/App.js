import { Fragment } from "react";
import Home from "./components/Home";
import Cart from "./components/NavigationBar/Cart";
import NavigationBar from "./components/NavigationBar/nav-bar";

const App = () => {
  return (
    <Fragment>
      <Cart/>
      <NavigationBar />
      <Home />
    </Fragment>
  );
};

export default App;
