import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Wallet } from "./context/walletProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Wallet>
      <App />
    </Wallet>
  </React.StrictMode>
);
