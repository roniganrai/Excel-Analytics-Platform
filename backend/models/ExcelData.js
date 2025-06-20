const mongoose = require("mongoose");

const excelDataSchema = new mongoose.Schema({
  "First Name": String,
  "Last Name": String,
  Gender: String,
  Country: String,
  Age: Number,
  Date: String, // or use Date if it's a valid date
  Id: Number,
});

module.exports = mongoose.model("ExcelData", excelDataSchema);
