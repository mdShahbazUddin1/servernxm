const express = require("express");
const jwt = require("jsonwebtoken");
const { NoteModel } = require("../model/note.model");
const noteRoute = express.Router();



noteRoute.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "superman");
  try {
    if (decoded) {
      const notes = await NoteModel.find({ userID: decoded.userID });
      if (notes.length > 0) {
        res.status(200).send(notes);
      } else {
        res.status(400).send({ msg: "You haven't added any note yet!" });
      }
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

noteRoute.post("/addnote", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "Notes added" });
  } catch (error) {
    res.status(400).send({ msg: "Failed to add note" });
  }
});



noteRoute.patch("/updatenote/:id", async (req, res) => {
  const { id } = req.params;
  const payLoad = req.body;
  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, payLoad);
    res.status(200).send({ msg: "notes updated" });
  } catch (error) {
    res.status(400).send(error);
  }
});


noteRoute.delete("/deletenote/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "notes deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = {
  noteRoute,
};
