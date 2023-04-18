import { myV4TokenKey } from "./index";
import * as http from "https";
import { Buffer } from "buffer";

export type apiResponse = {
  request_token: string;
};

export const tmdb_postCreateRequestTokenV4 = async (uniqueString: string): Promise<apiResponse> => {
  return new Promise((parentResolve, parentReject) => {
    var options = {
      method: "POST",
      hostname: "api.themoviedb.org",
      port: null,
      path: "/4/auth/request_token",
      headers: {
        "content-type": "application/json;charset=utf-8",
        authorization: `Bearer ${myV4TokenKey}`,
      },
    };

    var req = http.request(options, async function (res) {
      var chunks: Uint8Array[] = [];
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        // console.log(body.toString());
        parentResolve(JSON.parse(body.toString()));
      });
    });

    req.on("error", (e) => {
      parentReject(e.message);
    });

    //redirect_to is where you redirect the users after they approve the request_token
    //so, what you should do is to redirect_to a successfully approved page, then set context and session provider
    // req.write(
    //   JSON.stringify({
    //     redirect_to: `http://localhost:3000/user_authentication/${uniqueString}`,
    //   }),
    //   async (err) => {
    //     if (err) console.log("error exists, so not approved?");
    //     else console.log("no error exists, so is it really approved?");
    //   },
    // );
    req.end();
  });
};
