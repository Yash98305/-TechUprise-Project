const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: String,
  description: String,
  tags: [String],
  favorite: { type: Boolean, default: false }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
