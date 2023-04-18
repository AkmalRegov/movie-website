import React from "react";
import { UserAccessState, UserAccessActionTypes } from "./UserAccessReducer";

export interface UserAccessContextProps {
  state: UserAccessState;
  dispatch: React.Dispatch<UserAccessActionTypes>;
}

export const UserAccessContext = React.createContext({} as UserAccessContextProps);
