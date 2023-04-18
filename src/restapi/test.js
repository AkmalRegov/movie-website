var http = require("https");

var options = {
  method: "POST",
  hostname: "api.themoviedb.org",
  port: null,
  path: "/4/auth/request_token",
  headers: {
    "content-type": "application/json;charset=utf-8",
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDA2NTY0YjdkYWMwMDM3YTA1MmNkOTAxYTlkNDdhMCIsInN1YiI6IjY0MmEyZWYwYzA0NDI5MDI5OGNmNTVhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MR89YePKEPzzdlgRsvShau_HUhRmw-eDR4JZAHGO2EA",
  },
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ redirect_to: "http://www.themoviedb.org/" }));
req.end();
