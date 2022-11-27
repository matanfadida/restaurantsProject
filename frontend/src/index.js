import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import CartProvider from "./state/cart-provider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </React.StrictMode>
);
