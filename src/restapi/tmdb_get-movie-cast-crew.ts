import { myV3APIKey, apiURL } from "./index";

export const tmdb_getMovieCastCrew = async (movieId: number): Promise<Response> => {
  return fetch(encodeURI(`${apiURL}movie/${movieId}/credits?api_key=${myV3APIKey}&language=en-US`));
};
