const express = require("express");
const router = express.Router();


const { trainCommand, runCommand } = require("../controllers/commandControllers")

router.route("/execute-train").get(trainCommand);
router.route("/execute-facerec").get(runCommand);


module.exports = router;