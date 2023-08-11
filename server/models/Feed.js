const { Schema } = require("mongoose");
const commentsSchema = require("./Comments");
const dateFormat = require("./dateFormat");
// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const feedSchema = new Schema({
  
  status: {
    type: String,
  },
  // resolved: {
  //   type: Boolean,
  //   default: false,
  // },
  problem: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [commentsSchema],
});

module.exports = feedSchema;
