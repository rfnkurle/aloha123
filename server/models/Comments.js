const { Schema } = require('mongoose');

const commentsSchema = new Schema({
  commentText:
  {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
})

module.exports = commentsSchema;
