import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import axios from "axios";

import store from "./redux/store";
import { Provider } from "react-redux";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <BottomNav />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
