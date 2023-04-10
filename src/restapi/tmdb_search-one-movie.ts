import { myV3APIKey, apiURL } from "./index";

export const tmdb_searchOneMovie = async (movieId: number): Promise<Response> => {
  return fetch(encodeURI(`${apiURL}movie/${movieId}?api_key=${myV3APIKey}&language=en-US`));
};
