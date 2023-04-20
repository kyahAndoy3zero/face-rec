const mongoose = require("mongoose");

const personSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Add First Name"],
    },
    last_name: {
      type: String,
      required: [true, "Add Last Name"],
    },
    id_number: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
      required: [true, "Add Gender"]
    },
    year_level: {
      type: String,
      required: [true, "Add Year Level"]
    },
    course: {
      type: String,
      required: [true, "Add Course"],
    },
    time_in: {
      type: String,
      default: "00:00:00",
    },
    face_data: [String],
    show: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("person", personSchema);
