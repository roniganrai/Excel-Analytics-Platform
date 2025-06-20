const express = require("express");
const router = express.Router();
const { uploadExcel } = require("../controllers/uploadController");

router.post("/upload", uploadExcel);

module.exports = router;
