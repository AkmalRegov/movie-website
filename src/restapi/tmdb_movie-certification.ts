import { myV3APIKey, apiURL } from "./index";

export const tmdb_movieReleaseDatesData = async (movieId: number): Promise<Response> => {
  return fetch(encodeURI(`${apiURL}movie/${movieId}/release_dates?api_key=${myV3APIKey}`));
};
