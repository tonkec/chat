const express = require("express");
const app = express();
const config = require("./config/app");
const router = require("./router");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = config.appPort;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log("Server listening");
});
