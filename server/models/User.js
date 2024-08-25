const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
});

const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = StudentModel;
