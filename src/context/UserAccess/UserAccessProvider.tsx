import React, { useReducer } from "react";
import { UserAccessContext, UserAccessContextProps } from "./UserAccessContext";
import { UserAccessReducer, UserAccessState } from "./UserAccessReducer";

export const initializeUserAccessState: UserAccessState = {
  requestToken: "",
  requestTokenApproved: false,
  uniqueKey: "",
  accessToken: "",
};

export interface UserAccessProviderProps {
  children: React.ReactNode;
}

const UserAccessProvider: React.FC<UserAccessProviderProps> = ({
  children,
}: UserAccessProviderProps) => {
  const [state, dispatch] = useReducer(UserAccessReducer, initializeUserAccessState);
  const UserAccessStateValue: UserAccessContextProps = {
    state: state,
    dispatch: dispatch,
  };
  return (
    <UserAccessContext.Provider value={UserAccessStateValue}>{children}</UserAccessContext.Provider>
  );
};

export default UserAccessProvider;
