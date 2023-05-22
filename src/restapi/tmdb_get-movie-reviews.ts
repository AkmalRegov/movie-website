import { myV3APIKey, apiURL } from "./index";

export const tmdb_getMovieReviews = async (
  movieId: number,
  currentPage: number = 1,
): Promise<movieReview> => {
  return fetch(
    encodeURI(
      `${apiURL}movie/${movieId}/reviews?api_key=${myV3APIKey}&language=en-US&page=${currentPage}`,
    ),
  ).then((res) => res.json());
};
//https://api.themoviedb.org/3/movie/76600/reviews?api_key=a406564b7dac0037a052cd901a9d47a0&language=en-US&page=1

export type movieReview = {
  id: number;
  page: number;
  results: result[];
  total_pages: number;
  total_results: number;
};

interface result {
  author: string;
  author_details: author_details;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface author_details {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}
