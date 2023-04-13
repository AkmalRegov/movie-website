import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, redirect, defer, Params } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as ROUTES from "./routes";
import * as PAGES from "./pages";
import * as API from "./restapi";

async function loaderTrendingMovies() {
  const data = await API.tmdb_trendingMovies().then((res) => res.json());
  return defer({ data });
}

async function loaderSearchOneMovie(params: Params<string>) {
  const onlyDigitsRegex = /^\d+$/;
  if (!onlyDigitsRegex.test(params.movieId as string)) {
    throw new Response("Not Found", {
      status: 404,
      statusText: `MovieId '${params.movieId}' not found!`,
    });
  }
  const fetchedOneMovieData = await API.tmdb_searchOneMovie(
    parseInt(params.movieId as string),
  ).then((res) => res.json());

  const fetchedMovieReleaseDatesData = await API.tmdb_movieReleaseDatesData(
    parseInt(params.movieId as string),
  ).then((res) => res.json());

  const fetchedMovieCastCrew = await API.tmdb_getMovieCastCrew(
    parseInt(params.movieId as string),
  ).then((res) => res.json());

  return defer({ fetchedOneMovieData, fetchedMovieReleaseDatesData, fetchedMovieCastCrew });
}

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <App />,
    errorElement: <PAGES.ErrorPage />,
    loader: loaderTrendingMovies,
  },
  {
    path: ROUTES.moviePage,
    element: <PAGES.MoviesDetails />,
    errorElement: <PAGES.ErrorPage />,
    loader: ({ params }) => loaderSearchOneMovie(params),
  },
  {
    path: ROUTES.watchlist,
    // element: <PAGES.TodoList />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
