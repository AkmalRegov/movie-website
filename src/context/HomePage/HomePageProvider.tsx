import React, { useReducer } from "react";
import { HomePageContext, HomePageContextProps } from "./HomePageContext";
import { HomePageReducer, HomePageState } from "./HomePageReducer";

export const initialHomePageState: HomePageState = {
  trendingMovies: [],
  searchedMovies: [],
  searchText: "",
  submittedSearch: "",
  prevSubmittedSearch: "",
  currentPage: 1,
  totalPageForMovieSearched: 0,
  submitSearch: false,
  sectionCount: 1,
  searchedSectionCount: 1,
  maxSearchedSectionCount: 1,
};

export interface HomePageProviderProps {
  children: React.ReactNode;
}

const HomePageProvider: React.FC<HomePageProviderProps> = ({ children }: HomePageProviderProps) => {
  const [state, dispatch] = useReducer(HomePageReducer, initialHomePageState);
  const HomePageStateValue: HomePageContextProps = {
    state: state,
    dispatch: dispatch,
  };
  return <HomePageContext.Provider value={HomePageStateValue}>{children}</HomePageContext.Provider>;
};

export default HomePageProvider;
