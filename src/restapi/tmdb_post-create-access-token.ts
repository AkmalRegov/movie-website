import { myV4TokenKey, apiURL } from "./index";
import * as http from "https";
import { Buffer } from "buffer";

export type apiResponse = {
  access_token: string;
};

export const tmdb_postCreateAccessTokenV4 = async (
  uniqueString: string,
  request_token: string,
): Promise<apiResponse> => {
  return fetch(encodeURI(`https://api.themoviedb.org/4/auth/access_token`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: `Bearer ${myV4TokenKey}`,
    },
    body: JSON.stringify({
      request_token: `${request_token}`,
    }),
  }).then((res) => res.json());
};

// export const tmdb_postCreateAccessTokenV4 = async (
//   uniqueString: string,
//   request_token: string,
// ): Promise<apiResponse> => {
//   return new Promise((parentResolve, parentReject) => {
//     var options = {
//       method: "POST",
//       hostname: "api.themoviedb.org",
//       port: null,
//       path: "/4/auth/access_token",
//       headers: {
//         "content-type": "application/json;charset=utf-8",
//         authorization: `Bearer ${myV4TokenKey}`,
//       },
//     };

//     var req = http.request(options, async function (res) {
//       var chunks: Uint8Array[] = [];
//       res.on("data", function (chunk) {
//         chunks.push(chunk);
//       });

//       res.on("end", function () {
//         var body = Buffer.concat(chunks);
//         // console.log(body.toString());
//         parentResolve(JSON.parse(body.toString()));
//       });
//     });

//     req.on("error", (e) => {
//       parentReject(e.message);
//     });

//     req.write(
//       JSON.stringify({
//         request_token: `${request_token}`,
//       }),
//       async (err) => {
//         if (err) console.log("error exists, so not approved?");
//         else console.log("no error exists, so is it really approved?");
//       },
//     );
//     req.end();
//   });
// };
