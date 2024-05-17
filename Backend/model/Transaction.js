const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  id: {
    type: String,
  },
  book: {
    type: String,
    required: true,
  },
  member: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
  rentDate: {
    type: String,
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  fine: {
    type: Number,
    required: false,
  },
  clientReturnDate: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
