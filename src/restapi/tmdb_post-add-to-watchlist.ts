import { myV3APIKey, apiURL } from "./index";

export type apiResponse = {
  status_code: number;
  status_message: string;
};

export const tmdb_postAddToWatchlist = async (
  account_id: number,
  session_id: string,
  media_id: number,
  add_flag?: boolean,
): Promise<apiResponse> => {
  return fetch(
    encodeURI(
      `${apiURL}account/${account_id}/watchlist?api_key=${myV3APIKey}&session_id=${session_id}`,
    ),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: media_id,
        watchlist: add_flag ?? true,
      }),
    },
  ).then((res) => res.json());
};
