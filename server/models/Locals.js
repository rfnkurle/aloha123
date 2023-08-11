const { Schema, model } = require("mongoose");

const localsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    hometown: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    // picture download property here
    image: {
      type: String,
    },
    whatToKnow: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
    },
    support: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
    },
    whereAreYou: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
const Locals = model("locals", localsSchema);
module.exports = Locals;
