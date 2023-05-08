import React from "react";
import { UserDetailsState, UserDetailsActionTypes } from "./UserDetailsReducer";

export interface UserDetailsContextProps {
  state: UserDetailsState;
  dispatch: React.Dispatch<UserDetailsActionTypes>;
}

export const UserDetailsContext = React.createContext({} as UserDetailsContextProps);
