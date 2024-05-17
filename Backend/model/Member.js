const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  mobile: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: Object,
    required: false,
  },
  removedFileId: {
    type: String,
    required: false,
  },
  rentedBooks: {
    type: [Object],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Member", memberSchema);
