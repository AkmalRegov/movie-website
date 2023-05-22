import { myV3APIKey, apiURL } from "./index";

export type apiResponse = {
  avatar: avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

type avatar = {
  gravatar: {
    hash: string;
  };
  tmdb: {
    avatar_path: string | null | undefined;
  };
};

export const tmdb_getAccountDetails = async (session_id: string): Promise<apiResponse> => {
  return fetch(`${apiURL}account?api_key=${myV3APIKey}&session_id=${session_id}`).then((res) =>
    res.json(),
  );
};
