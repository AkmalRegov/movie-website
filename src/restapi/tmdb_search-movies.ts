import { myV3APIKey, apiURL } from "./index";

export const tmdb_searchMovies = async (
  submittedSearch: string,
  currentPage: number,
): Promise<Response> => {
  return fetch(
    encodeURI(
      `${apiURL}search/movie?api_key=${myV3APIKey}&language=en-US&query=${submittedSearch}&page=${currentPage}&include_adult=false`,
    ),
  );
};
