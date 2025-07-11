// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 🎨 Global styles (Tailwind + custom styles)
import "./index.css";

// 🌱 React app mount point
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
