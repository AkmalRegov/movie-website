import { myV3APIKey, apiURL } from "./index";

export const tmdb_searchOneMovie = async (movieId: number): Promise<Response> => {
  return fetch(encodeURI(`${apiURL}movie/${movieId}?api_key=${myV3APIKey}&language=en-US`));
};

export type oneMovieData = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: object | null;
  budget: number;
  genres: genres[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: production_companies[];
  production_countries: production_countries[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: spoken_languages[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

interface genres {
  id: number;
  name: string;
}

interface production_companies {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

interface production_countries {
  iso_3166_1: string;
  name: string;
}

interface spoken_languages {
  iso_638_1: string;
  name: string;
}
