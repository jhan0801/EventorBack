var express = require("express");
var router = express.Router();
const user = require("../controllers/user");
/* GET users listing. */
router.get("/", user.find);

router.post("/signup", user.createUser);


module.exports = router;