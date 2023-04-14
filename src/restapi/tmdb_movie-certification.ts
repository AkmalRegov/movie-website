import { myV3APIKey, apiURL } from "./index";

export const tmdb_movieReleaseDatesData = async (movieId: number): Promise<Response> => {
  return fetch(encodeURI(`${apiURL}movie/${movieId}/release_dates?api_key=${myV3APIKey}`));
};

export type movieReleaseDates = {
  id: number;
  results: moviesResult[];
};

interface moviesResult {
  iso_3166_1: string;
  release_dates: release_date[];
}

interface release_date {
  certification: string;
  iso_639_1: string;
  release_date: string;
  type: number;
  note: string;
}
