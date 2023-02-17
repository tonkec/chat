const express = require("express");
const app = express();
const config = require("./config/app");
const port = config.appPort;

app.get("/home", (req, res) => {
  return res.send("Home");
});
app.listen(port, () => {
  console.log("Server listening");
});
