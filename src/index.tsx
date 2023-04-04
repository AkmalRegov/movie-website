import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as ROUTES from "./routes";
import * as PAGES from "./pages";

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <App />,
    errorElement: <PAGES.ErrorPage />,
  },
  {
    path: ROUTES.moviePage,
    element: <PAGES.MoviesDetails />,
  },
  {
    path: ROUTES.watchlist,
    // element: <PAGES.TodoList />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
