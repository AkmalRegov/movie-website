import React from "react";
import { HomePageActionTypes, HomePageState } from "./homePageReducer";

export interface HomePageContextProps {
  state: HomePageState;
  dispatch: React.Dispatch<HomePageActionTypes>;
}

export const HomePageContext = React.createContext({} as HomePageContextProps);
