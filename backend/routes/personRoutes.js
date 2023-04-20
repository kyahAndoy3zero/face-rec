const express = require("express");
const router = express.Router();

const {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson,
  reset,
  studentStats
} = require("../controllers/personControllers");


router.route('/student-stats').get(studentStats);

router.route("/").get(getPersons).post(createPerson).patch(updatePerson)
router.route("/:id").delete(deletePerson).patch(reset);


module.exports = router;
