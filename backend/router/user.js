const router = require("express").Router();
const { update } = require("../controllers/usersController");
const { auth } = require("../middleware/auth");
const { userFile } = require("../middleware/fileUpload");
const { validate } = require("../validators/index");
const { rules: updateRules } = require("../validators/user/update");
router.post("/update", [auth, userFile, updateRules(), validate], update);
module.exports = router;
