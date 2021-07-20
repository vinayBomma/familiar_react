const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: String,
  batteryLevel: Number,
  email: String,
  avatar: String,
  uid: String,
  groupID: {
    type: Schema.Types.ObjectId,
    ref: "groups",
  },
  // location: [[Number, Number]]
});

module.exports = mongoose.model("User", userSchema);
