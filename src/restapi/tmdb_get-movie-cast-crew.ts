import { myV3APIKey, apiURL } from "./index";

export const tmdb_getMovieCastCrew = async (movieId: number): Promise<Response> => {
  return fetch(encodeURI(`${apiURL}movie/${movieId}/credits?api_key=${myV3APIKey}&language=en-US`));
};

export interface castInterface {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface crewInterface {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export type movieCastCrewType = {
  id: number;
  cast: castInterface[];
  crew: crewInterface[];
};
