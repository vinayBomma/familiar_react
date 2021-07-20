const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: String,
    totalMembers: Number,
    inviteCode: String,
    // members: [String],
    // admin: [String]
})

module.exports = mongoose.model('Group', groupSchema)