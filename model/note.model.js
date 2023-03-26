const mongoose = require("mongoose");

// Creating UserSchema

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    subject: {
      type: String,
      require: true,
      unique: true,
    },
    userID: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

// creating UserModel

const NoteModel = mongoose.model("notecol", noteSchema);

module.exports = {
  NoteModel,
};
