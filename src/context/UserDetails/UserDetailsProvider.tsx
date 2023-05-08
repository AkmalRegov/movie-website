import React from "react";
import { UserDetailsContext, UserDetailsContextProps } from "./UserDetailsContext";
import { UserDetailsReducer, UserDetailsState } from "./UserDetailsReducer";

export const initialUserDetailsState: UserDetailsState = {
  avatar: {
    gravatar: {
      hash: "",
    },
    tmdb: {
      avatar_path: "",
    },
  },
  id: -1,
  iso_639_1: "",
  iso_3166_1: "",
  name: "",
  include_adult: false,
  username: "",
};
