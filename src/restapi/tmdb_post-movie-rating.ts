import { apiURL, myV4TokenKey } from "./index";

export const tmdb_postMovieRatings = async (
  rating: number,
  movie_id: number,
  session_id: string,
): Promise<Response> => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${myV4TokenKey}`,
    },
    body: JSON.stringify({
      value: rating,
    }),
  };

  return fetch(encodeURI(`${apiURL}movie/${movie_id}/rating?session_id=${session_id}`), options);
};
