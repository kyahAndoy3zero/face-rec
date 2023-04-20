const express = require("express");
const router = express.Router();
const { uploadFiles, parseCsv, uploadImages } = require("../middleware/importMiddleware");


const { importFiles } = require("../controllers/importControllers")

router.route("/files").post(uploadFiles, parseCsv, uploadImages, importFiles);

module.exports = router;