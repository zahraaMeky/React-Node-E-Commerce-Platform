import React from "react";
import ReactDOM from "react-dom";
import ShopContextProvider from './Components/Context/ShopContext';
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
