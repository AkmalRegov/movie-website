export * as SEARCH_MOVIES from "./tmdb_search-movies";
export * as TRENDING_MOVIES from "./tmdb_trending-movies";
export * as SEARCH_ONE_MOVIE from "./tmdb_search-one-movie";
export * as MOVIE_CERTIFICATION from "./tmdb_movie-certification";
export * as GET_MOVIE_CAST_CREW from "./tmdb_get-movie-cast-crew";
export * as GET_MOVIE_REVIEWS from "./tmdb_get-movie-reviews";
export * as CREATE_REQUEST_TOKEN from "./tmdb_post-create-request-token";
export * as CREATE_ACCESS_TOKEN from "./tmdb_post-create-access-token";
export * as CREATE_SESSION_WITH_ACCESS_TOKEN from "./tmdb_create-session-with-access-token";
export * as GET_ACCOUNT_DETAILS from "./tmdb_get-account-details";
export * as GET_WATCHLIST from "./tmdb_get-watchlist";
export * as POST_ADD_TO_WATCHLIST from "./tmdb_post-add-to-watchlist";
export * as GET_ACCOUNT_STATE from "./tmdb_get-account-states";
export * as POST_MOVIE_RATING from "./tmdb_post-movie-rating";
export * as DELETE_MOVIE_RATING from "./tmdb_delete-movie-rating";

export const apiURL = process.env.API_V3_URL;
export const myV3APIKey = process.env.MY_API_KEY;
export const myV4TokenKey = process.env.MY_V4_TOKEN_KEY;
