import { Fragment } from "react";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar/nav-bar";

const App = () => {
  return (
    <Fragment>
      <NavigationBar />
      <Home />
    </Fragment>
  );
};

export default App;
