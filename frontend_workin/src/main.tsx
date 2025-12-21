import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// 🧠 Correções:
// - Removido ".tsx" da importação do App (não é necessário).
// - Mantido BrowserRouter envolvendo todo o app.
// - Garantido StrictMode e ordem correta das imports.

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
