import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, defer, Params } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as ROUTES from "./routes";
import * as PAGES from "./pages";
import * as API from "./restapi";
import UserAccessProvider from "./context/UserAccess/UserAccessProvider";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
// import "antd/dist/reset.css";

async function loaderTrendingMovies() {
  const data = await API.TRENDING_MOVIES.tmdb_trendingMovies().then((res) => res.json());
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
  const fetchedOneMovieData = await API.SEARCH_ONE_MOVIE.tmdb_searchOneMovie(
    parseInt(params.movieId as string),
  ).then((res) => res.json());

  const fetchedMovieReleaseDatesData = await API.MOVIE_CERTIFICATION.tmdb_movieReleaseDatesData(
    parseInt(params.movieId as string),
  ).then((res) => res.json());

  const fetchedMovieCastCrew = await API.GET_MOVIE_CAST_CREW.tmdb_getMovieCastCrew(
    parseInt(params.movieId as string),
  ).then((res) => res.json());

  const fetchedMovieReviews = await API.GET_MOVIE_REVIEWS.tmdb_getMovieReviews(
    parseInt(params.movieId as string),
  ).then((res) => res.json());

  return defer({
    fetchedOneMovieData,
    fetchedMovieReleaseDatesData,
    fetchedMovieCastCrew,
    fetchedMovieReviews,
  });
}

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <App />,
    errorElement: <PAGES.ErrorPage />,
    children: [
      {
        path: ROUTES.home,
        element: <HomeScreen />,
        loader: loaderTrendingMovies,
      },
      {
        path: ROUTES.moviePage,
        element: <PAGES.MoviesDetails />,
        errorElement: <PAGES.ErrorPage />,
        loader: ({ params }) => loaderSearchOneMovie(params),
      },
      {
        path: ROUTES.userAuthenticated,
        element: <PAGES.UserAuthentication />,
        errorElement: <PAGES.ErrorPage />,
      },
      {
        path: ROUTES.watchlist,
        element: <PAGES.Watchlist />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
//<UserAccessProvider> as parent, works...
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
