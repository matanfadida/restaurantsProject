import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import CartProvider from "./state/cart-provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App/>
    </CartProvider>
  </React.StrictMode>
);
