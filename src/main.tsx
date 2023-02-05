import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./redux/store";
import { DragDropContext } from "react-beautiful-dnd";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DragDropContext>
          <App />
        </DragDropContext>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
