var http = require("http");
var fs = require("fs");
var url = require("url");
const { v4: uuidv4 } = require("uuid");

var server = http.createServer(function (req, res) {
  var path = url.parse(req.url).pathname;
  if (req.url === "/html") {
    fs.readFile("./index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/json") {
    fs.readFile("./data.json", function (err, data) {
      res.writeHead(200, { "Content-Type": "json" });
      res.write(data);
      res.end();
    });
  } else if (req.url === "/uuid") {
    res.writeHead(200, { "Content-Type": "json" });
    res.write(uuidv4());
    res.end();
  } else if (req.url === path) {
    let key = String(path);
    key = key.split("/");

    if (key[1] === "delay") {
      setTimeout(() => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Hey you are " + key[2] + " seconds delayed");
        res.end();
      }, parseInt(key[2]) * 1000);
    } else if (key[1] === "status") {
      res.writeHead(parseInt(key[2]), { "Content-Type": "text/html" });
      res.write("Status code is " + key[2]);
      res.end();
    } else {
      res.writeHead(404);
      res.write("opps this doesn't exist - 404");
      res.end();
    }
  } else {
    res.writeHead(404);
    res.write("opps this doesn't exist - 404");
    res.end();
  }
});

server.listen(5000);

console.log("Node.js web server at port 5000 is running..");
