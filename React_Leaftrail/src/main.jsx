import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import Bootstrap SCSS custom kamu
import "./styles/bootstrap-custom.scss";
import "@splidejs/splide/dist/css/splide.min.css";
import "glightbox/dist/css/glightbox.min.css";
import "./styles/style.css";

// Import Bootstrap JS (biar toggle navbar di mobile jalan)
import "bootstrap/dist/js/bootstrap.bundle.min";

// Import Bootstrap Icons (kalau pakai icon bi bi-*)
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
