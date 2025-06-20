const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const ExcelData = require("../models/ExcelData");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage }).single("file");

const uploadExcel = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: err.message });

    try {
      const filePath = req.file.path;
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(sheet);

      // Optional: delete uploaded file
      fs.unlinkSync(filePath);

      // Clean unwanted keys like "0"
      const cleanedData = data.map((row) => ({
        "First Name": row["First Name"],
        "Last Name": row["Last Name"],
        Gender: row["Gender"],
        Country: row["Country"],
        Age: row["Age"],
        Date: row["Date"],
        Id: row["Id"],
      }));

      // Insert into MongoDB
      const savedData = await ExcelData.insertMany(cleanedData);

      res.status(200).json({ message: "Excel data uploaded", data: savedData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports = { uploadExcel };
