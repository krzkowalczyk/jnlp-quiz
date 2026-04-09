import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App.jsx";

// Polyfill window.storage if not available (for local dev)
if (!window.storage) {
  const store = {};
  window.storage = {
    async get(key) { return store[key] ?? localStorage.getItem(key); },
    async set(key, value) { store[key] = value; localStorage.setItem(key, value); },
    async delete(key) { delete store[key]; localStorage.removeItem(key); },
  };
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
