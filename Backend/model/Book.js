const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
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
  authors: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  totalPage: {
    type: Number,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  frontCoverDetails: {
    type: Object,
    required: false,
  },
  backCoverDetails: {
    type: Object,
    required: false,
  },
  removedFrontCoverId: {
    type: String,
    required: false,
  },
  removedBackCoverId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
