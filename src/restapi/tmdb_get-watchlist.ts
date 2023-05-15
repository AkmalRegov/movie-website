import { myV3APIKey, apiURL } from "./index";

export const tmdb_getWatchlist = async (
  account_id: number,
  session_id: string,
  page: number = 1,
): Promise<Response> => {
  return fetch(
    encodeURI(
      `${apiURL}account/${account_id}/watchlist/movies?api_key=${myV3APIKey}&language=en-US&session_id=${session_id}&sort_by=created_at.asc&page=${page}`,
    ),
  );
};

export interface Watchlist {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
