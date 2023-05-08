import { GET_ACCOUNT_DETAILS } from "../../restapi";

export type UserDetailsState = GET_ACCOUNT_DETAILS.apiResponse;

export type UserDetailsActionTypes =
  | {
      type: "get account details";
      avatar: UserDetailsState["avatar"];
      id: number;
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      include_adult: boolean;
      username: string;
    }
  | {
      type: "reset account details";
    };

export function UserDetailsReducer(
  state: UserDetailsState,
  action: UserDetailsActionTypes,
): UserDetailsState {
  switch (action.type) {
    case "get account details":
      return {
        ...state,
        avatar: action.avatar,
        id: action.id,
        iso_639_1: action.iso_639_1,
        iso_3166_1: action.iso_3166_1,
        name: action.name,
        include_adult: action.include_adult,
        username: action.username,
      };
    case "reset account details":
      return {
        ...state,
        avatar: { gravatar: { hash: "" }, tmdb: { avatar_path: "" } },
        id: -1,
        iso_639_1: "",
        iso_3166_1: "",
        name: "",
        include_adult: false,
        username: "",
      };
    default:
      return state;
  }
}
