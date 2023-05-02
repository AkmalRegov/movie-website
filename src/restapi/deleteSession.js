// const { myV3APIKey } = require("./index");
const { Buffer } = require("buffer");
const http = require("https");

const tmdb_deleteSession = async () => {
  return new Promise((parentResolve, parentReject) => {
    var options = {
      method: "DELETE",
      hostname: "api.themoviedb.org",
      port: null,
      path: "/3/authentication/session?api_key=" + process.env.myV3APIKey,
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    };

    var req = http.request(options, async function (res) {
      var chunks = [];
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

    // redirect_to is where you redirect the users after they approve the request_token
    // so, what you should do is to redirect_to a successfully approved page, then set context and session provider
    req.write(
      JSON.stringify({
        session_id: "b6350468xxxxxxxx",
      }),
      async (err) => {
        if (err) console.log("error exists, so not approved?");
        else console.log("no error exists, so is it really approved?");
      },
    );
    req.end();
  });
};
tmdb_deleteSession();
