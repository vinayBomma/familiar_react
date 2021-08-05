const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: String,
  batteryLevel: Number,
  email: String,
  avatar: String,
  uid: String,
  location: [String],
  group: [String]
});
module.exports = mongoose.model("User", userSchema);
