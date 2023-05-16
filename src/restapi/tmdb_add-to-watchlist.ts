import { myV3APIKey, apiURL } from "./index";

export const tmdb_addToWatchlist = async (
  account_id: number,
  session_id: string,
  media_id: number,
): Promise<Response> => {
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
        watchlist: true,
      }),
    },
  );
};
