const mongoose = require("mongoose");

const CandidateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    studentID: String,
    dob: {
      type: String,
      required: [true, 'Please add candidate\' date of birth']
    },
    nickname: String,
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      default: 'Male'
    },
    room: { 
      type: String,
      required: [true, 'Please add the classroom of this candidate']
    },
    photo: {
     type: Buffer,
     required: [true, 'Please add a photo of this candidate']
    },
    votes: {
      yes: {
        type: Number,
        default: 0
      },
      no: {
        type: Number,
        default: 0
      },
      thumbs: {
        type: Number,
        default: 0
      }
    }
  },
  {
    timestamps: true
  }
);

// module.exports = mongoose.model("Candidate", CandidateSchema);
module.exports = CandidateSchema;
