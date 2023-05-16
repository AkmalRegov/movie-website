import { myV3APIKey } from "./index";
import * as http from "https";
import { Buffer } from "buffer";

//Is it possible to just create request token, access token and session in just one go?

export type apiResponse = {
  status_code: number;
  status_message: string;
};

export const tmdb_postAddToWatchlist = async (
  account_id: number,
  session_id: string,
  media_id: number,
  add_flag?: boolean,
): Promise<apiResponse> => {
  return new Promise((parentResolve, parentReject) => {
    var options = {
      method: "POST",
      hostname: "api.themoviedb.org",
      port: null,
      path: `/3/account/${account_id}/watchlist?api_key=${myV3APIKey}&session_id=${session_id}`,
      headers: {
        "content-type": "application/json;charset=utf-8",
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

    req.write(
      JSON.stringify({
        media_type: "movie",
        media_id: media_id,
        watchlist: add_flag ?? true,
      }),
      async (err) => {
        if (err) console.log("error exists, so not approved? For adding to watchlist.");
        else console.log("no error exists, so is it really approved? For adding to watchlist.");
      },
    );
    req.end();
  });
};
