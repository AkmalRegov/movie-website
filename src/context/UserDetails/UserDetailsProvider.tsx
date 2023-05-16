import React, { useReducer } from "react";
import { UserDetailsContext, UserDetailsContextProps } from "./UserDetailsContext";
import { UserDetailsReducer, UserDetailsState } from "./UserDetailsReducer";

export const initialUserDetailsState: UserDetailsState = {
  // avatar: {
  //   gravatar: {
  //     hash: "",
  //   },
  //   tmdb: {
  //     avatar_path: "",
  //   },
  // },
  // id: -1,
  // iso_639_1: "",
  // iso_3166_1: "",
  // name: "",
  // include_adult: false,
  // username: "",

  avatar: {
    gravatar: {
      hash: "35e84f36cd0a1c2818fa6cf8019f91a7",
    },
    tmdb: {
      avatar_path: null,
    },
  },
  id: 18689211,
  iso_639_1: "en",
  iso_3166_1: "MY",
  name: "",
  include_adult: false,
  username: "AkmalAnuar",
};

export interface UserDetailsProviderProps {
  children: React.ReactNode;
}

const UserDetailsProvider: React.FC<UserDetailsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(UserDetailsReducer, initialUserDetailsState);
  const UserDetailsStateValue: UserDetailsContextProps = {
    state: state,
    dispatch: dispatch,
  };
  return (
    <UserDetailsContext.Provider value={UserDetailsStateValue}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsProvider;
