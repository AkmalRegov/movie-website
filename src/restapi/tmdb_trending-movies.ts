import { myV3APIKey, apiURL } from "./index";

export const tmdb_trendingMovies = async (): Promise<Response> => {
  return fetch(encodeURI(`${apiURL}trending/movie/week?api_key=${myV3APIKey}`)).then((res) =>
    res.json(),
  );
};
