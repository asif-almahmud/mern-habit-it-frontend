import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HabitsContextProvider } from "./context/HabitsContext";
import { UserContextProvider } from "./context/UserContext";
import { LoadingContextProvider } from "./context/LoadingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoadingContextProvider>
      <UserContextProvider>
        <HabitsContextProvider>
          <App />
        </HabitsContextProvider>
      </UserContextProvider>
    </LoadingContextProvider>
  </React.StrictMode>
);
