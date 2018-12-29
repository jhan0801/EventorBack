const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

var userSchema = new Schema({
   userName: {
      type: String,
      required: true
   },
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   address: {
      type: String
   },
   hash: {
      type: String,
      required: true
   },
   salt: {
      type: String,
      required: true
   },
   lastLogIn: {
      type: String,
      required: true,
      default: Date.now
   },
   whenCreated: {
      type: Date,
      required: true
   },
   oAuthId: {
      type: String
   }
});

userSchema.methods.setPassword = function (password) {
   this.salt = crypto.randomBytes(64).toString("hex");
   this.hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
};

userSchema.methods.validatePassword = function (password) {
   const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
   return this.hash === hash;
};



var User = mongoose.model("User", userSchema);

module.exports = User;