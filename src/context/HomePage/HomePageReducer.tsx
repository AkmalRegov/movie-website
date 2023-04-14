import { SEARCH_MOVIES } from "../../restapi";
type movieData = SEARCH_MOVIES.movieData;

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
      type: "get searched movies";
      searchedMovies: movieData[];
      maxSearchedSectionCount: number;
      totalPageForMovieSearched: number;
    }
  | { type: "change submitSearch bool"; submitSearch: boolean }
  | { type: "set searchText string"; searchText: string }
  | { type: "set submittedSearch string"; submittedSearch: string }
  | { type: "set currentPage number"; currentPage: number }
  | { type: "set searchedSectionCount number"; searchedSectionCount: number }
  | { type: "set prevSubmittedSearch string"; prevSubmittedSearch: string }
  | { type: "go to previous trending section"; sectionCount: number }
  | { type: "go to next trending section"; sectionCount: number }
  | { type: "go to previous searched section"; searchedSectionCount: number }
  | { type: "go to next searched section"; searchedSectionCount: number };

export function HomePageReducer(state: HomePageState, action: HomePageActionTypes): HomePageState {
  switch (action.type) {
    case "get trending movies":
      return { ...state, trendingMovies: action.trendingMovies };
    case "get searched movies":
      return {
        ...state,
        searchedMovies: action.searchedMovies,
        maxSearchedSectionCount: action.maxSearchedSectionCount,
        totalPageForMovieSearched: action.totalPageForMovieSearched,
      };
    case "change submitSearch bool":
      return { ...state, submitSearch: action.submitSearch };
    case "set searchText string":
      return { ...state, searchText: action.searchText };
    case "set submittedSearch string":
      return { ...state, submittedSearch: action.submittedSearch };
    case "set prevSubmittedSearch string":
      return { ...state, prevSubmittedSearch: action.prevSubmittedSearch };
    case "set currentPage number":
      return { ...state, currentPage: action.currentPage };
    case "set searchedSectionCount number":
      return { ...state, searchedSectionCount: action.searchedSectionCount };
    case "go to previous trending section":
      return { ...state, sectionCount: action.sectionCount };
    case "go to next trending section":
      return { ...state, sectionCount: action.sectionCount };
    case "go to previous searched section":
      return { ...state, searchedSectionCount: action.searchedSectionCount };
    case "go to next searched section":
      return { ...state, searchedSectionCount: action.searchedSectionCount };
    default:
      return state;
  }
}
