const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  favorite: { type: Boolean, default: false }
});

module.exports = mongoose.model('Note', noteSchema);