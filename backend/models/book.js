const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  pages: Number,
  size: Number,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  faculty: String,
  department: String,
  tags: [{type: String, index: true}],
  url: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

bookSchema.index({title: 'text'})

module.exports = mongoose.model('Book', bookSchema)