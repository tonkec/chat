const express = require("express");
const app = express();
const config = require("./config/app");
const router = require("./router");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const port = config.appPort;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(router);

const server = http.createServer(app);
const SocketServer = require("./socket/");
SocketServer(server);

server.listen(port, () => {
  console.log("Server listening");
});
