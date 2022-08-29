import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WordContextProvider } from "./context/wordContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WordContextProvider>
      <App />
    </WordContextProvider>
  </React.StrictMode>
);
