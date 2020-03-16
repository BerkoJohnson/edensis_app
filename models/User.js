const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a name"],
      maxlength: [60, "Name cannot be more than 60 characters"]
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email"
      ]
    },
    hash: String,
    salt: String,
    isAdmin: {
      type: String,
      enum: ["Admin", "User", "Officer"],
      default: "User"
    },
    photo: Buffer
  },
  {
    timestamps: true
  }
);

UserSchema.methods.hashPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.verifyPassword = function(password) {
  const hashed = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");

  return this.hash === hashed;
};

UserSchema.methods.generateJwt = function() {
  const expiry = new Date(); // Create an  expiry date object
  expiry.setDate(expiry.getDate() + 7); // set it for 7 days

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, 
    process.env.JWT_SECRET
  )

}




module.exports = mongoose.model("User", UserSchema);
