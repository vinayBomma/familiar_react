const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  totalMembers: Number,
  inviteCode: String,
  members: {
    type: [String],
    default: undefined
  },
  admin: {
    type: [String],
    default: undefined
  }
});

module.exports = mongoose.model("Group", groupSchema);
