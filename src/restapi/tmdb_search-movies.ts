import { myV3APIKey, apiURL } from "./index";

export const tmdb_searchMovies = async (
  submittedSearch: string,
  currentPage: number,
): Promise<apiResponse> => {
  return fetch(
    encodeURI(
      `${apiURL}search/movie?api_key=${myV3APIKey}&language=en-US&query=${submittedSearch}&page=${currentPage}&include_adult=false`,
    ),
  ).then((res) => res.json());
};

export type apiResponse = {
  page: string;
  results: movieData[];
  total_pages: number;
  total_results: number;
};

export type movieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
