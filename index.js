const http = require("http");
const fs = require("fs");
const url = require("url");
const { v4: uuidv4 } = require("uuid");

const server = http.createServer(function (req, res) {
  const path = url.parse(req.url).pathname;
  let key = String(path);
  key = key.split("/");

  switch (path) {
    case "/":
      fs.readFile("./home.html", function (err, data) {
        if (err) {
          res.write("failed to read");
          res.end();
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        }
      });
      break;

    case "/html":
      fs.readFile("./index.html", function (err, data) {
        if (err) {
          res.write("failed to read");
          res.end();
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        }
      });
      break;

    case "/json":
      fs.readFile("./data.json", function (err, data) {
        res.writeHead(200, { "Content-Type": "json" });
        res.write(data);
        res.end();
      });
      break;

    case "/uuid":
      res.writeHead(200, { "Content-Type": "json" });
      res.write(uuidv4());
      res.end();
      break;

    case "/delay/" + key[2]:
      setTimeout(() => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Hey you are " + key[2] + " seconds delayed");
        res.end();
      }, parseInt(key[2]) * 1000);
      break;

    case "/status/" + key[2]:
      res.writeHead(parseInt(key[2]), { "Content-Type": "text/html" });
      res.write("Status code is " + key[2]);
      res.end();
      break;

    default:
      res.writeHead(404);
      res.write("opps this doesn't exist - 404");
      res.end();
      break;
  }
});

server.listen(5000);

console.log("Node.js web server at port 5000 is running..");
