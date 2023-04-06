export type movieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type HomePageState = {
  trendingMovies: movieData[];
  searchedMovies: movieData[];
  searchText: string;
  submittedSearch: string;
  prevSubmittedSearch: string;
  currentPage: number;
  totalPageForMovieSearched: number;
  submitSearch: boolean;
  sectionCount: number;
  searchedSectionCount: number;
  maxSearchedSectionCount: number;
};

export type HomePageActionTypes =
  | { type: "get trending movies"; trendingMovies: movieData[] }
  | {
      type: "submit search";
      searchedMovies: movieData[];
      maxSearchedSectionCount: number;
      totalPageForMovieSearched: number;
    };

export function HomePageReducer(state: HomePageState, action: HomePageActionTypes): HomePageState {
  switch (action.type) {
    case "get trending movies":
      return { ...state, trendingMovies: action.trendingMovies };
    case "submit search":
      return {
        ...state,
        searchedMovies: action.searchedMovies,
        maxSearchedSectionCount: action.maxSearchedSectionCount,
        totalPageForMovieSearched: action.totalPageForMovieSearched,
      };
  }
}
