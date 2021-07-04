const multer = require("multer");

const storage = multer.diskStorage({
  //it start from app.js
  destination: "./media",
  //cb :call back fn that take two arguments:error
  // and name of file that user insert with date to avoide/
  // name reduduncy
  //+sign represent date as a numbers which is a time stamp represents the number of milliseconds from 1970 to now.
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
