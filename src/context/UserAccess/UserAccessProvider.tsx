import React, { useReducer } from "react";
import { UserAccessContext, UserAccessContextProps } from "./UserAccessContext";
import { UserAccessReducer, UserAccessState } from "./UserAccessReducer";

export const initializeUserAccessState: UserAccessState = {
  requestToken: "",
  requestTokenApproved: false,
  uniqueKey: "",
  accessToken: "",
  sessionString: "",
};

export const testUserAccessState: UserAccessState = {
  requestToken:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOlsicGVuZGluZ19yZXF1ZXN0X3Rva2VuIl0sInZlcnNpb24iOjEsImV4cCI6MTY4MzUyNzgwOSwicmVkaXJlY3RfdG8iOm51bGwsIm5iZiI6MTY4MzUyNjkwOSwiYXVkIjoiYTQwNjU2NGI3ZGFjMDAzN2EwNTJjZDkwMWE5ZDQ3YTAiLCJqdGkiOjYxOTg2MTR9.jQMlF31BpXODa6DWHWc_-l929eb2sx-5KzoeTpsy89w",
  requestTokenApproved: true,
  uniqueKey: "test",
  accessToken:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOlsiYXBpX3JlYWQiLCJhcGlfd3JpdGUiXSwic3ViIjoiNjQyYTJlZjBjMDQ0MjkwMjk4Y2Y1NWFlIiwidmVyc2lvbiI6MSwibmJmIjoxNjgzNTI2OTE1LCJhdWQiOiJhNDA2NTY0YjdkYWMwMDM3YTA1MmNkOTAxYTlkNDdhMCIsImp0aSI6IjYxOTg2MTQifQ.ySqH5yzZZVCYo7mVr96Xact4hT8pjNNoSbmHIcUKoaQ",
  sessionString: "e4aaa3c8d6f9a68bea9272aba4ffc0502aa1d22b",
};

export interface UserAccessProviderProps {
  children: React.ReactNode;
}

const UserAccessProvider: React.FC<UserAccessProviderProps> = ({
  children,
}: UserAccessProviderProps) => {
  // const [state, dispatch] = useReducer(UserAccessReducer, initializeUserAccessState);
  const [state, dispatch] = useReducer(UserAccessReducer, testUserAccessState);
  const UserAccessStateValue: UserAccessContextProps = {
    state: state,
    dispatch: dispatch,
  };
  return (
    <UserAccessContext.Provider value={UserAccessStateValue}>{children}</UserAccessContext.Provider>
  );
};

export default UserAccessProvider;
