import { myV3APIKey, apiURL } from "./index";

export interface apiResponse {
  id: number;
  favorite: boolean;
  rated: Rated;
  watchlist: boolean;
}

export interface Rated {
  value: number;
}

export const tmdb_getAccountStates = async (
  movie_id: number,
  session_id: string,
): Promise<apiResponse> => {
  return fetch(
    encodeURI(
      `${apiURL}movie/${movie_id}/account_states?api_key=${myV3APIKey}&session_id=${session_id}`,
    ),
  ).then((res) => res.json());
};
