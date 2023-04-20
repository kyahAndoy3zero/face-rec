const asyncHanlder = require("express-async-handler");
const path = require("path");


const uploadFiles = asyncHanlder(async (req, res) => {
  const files = req.files;

  if (!files) {
    res.status(400);
    throw new Error('Image is required')
  }

  Object.keys(files).forEach((key) => {
    const filepath = path.join(
      __dirname,
      "../../student_images",
      files[key].name
    );
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
  });

  return res.json({
    status: "success",
    message: Object.keys(files).toString(),
  });
});

module.exports = {
  uploadFiles,
};
