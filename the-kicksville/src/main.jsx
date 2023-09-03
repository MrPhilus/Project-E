import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import KicksContextProvider from "./context/KicksContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KicksContextProvider>
      <App />
    </KicksContextProvider>
  </React.StrictMode>
);
