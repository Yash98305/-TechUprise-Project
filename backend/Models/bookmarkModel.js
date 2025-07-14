const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    validate: {
      validator: value => {
        return /^(http|https):\/\/[^ "]+$/.test(value);
      },
      message: 'Invalid URL format'
    }
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  favorite: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });


module.exports = mongoose.model('Bookmark', bookmarkSchema);
