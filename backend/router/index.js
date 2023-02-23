const router = require("express").Router();
router.get("/home", (req, res) => {
  return res.send("Home");
});

router.use("/", require("./auth"));
router.use("/users", require("./user"));

module.exports = router;
