const mongoose = require("mongoose");
const CandidateSchema = require('./Candidate');

const PositionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'Please add a title']
    },
    cast_type: {
      type: String,
      enum: ["Thumbs", "Yes/No"],
      default: "Thumbs",
    },
    candidates: [CandidateSchema]
  },
  {
    timestamps: true
  }
);

// module.exports = mongoose.model("Position", PositionSchema);
module.exports = PositionSchema
