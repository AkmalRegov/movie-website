import { apiURL, myV4TokenKey } from "./index";

export const tmdb_deleteMovieRatings = async (
  movie_id: number,
  session_id: string,
): Promise<Response> => {
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${myV4TokenKey}`,
    },
  };

  return fetch(encodeURI(`${apiURL}movie/${movie_id}?session_id=${session_id}`), options);
};
