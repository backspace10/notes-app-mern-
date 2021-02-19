const Notes = require("../models/noteModel");

const noteCtr = {
  getNotes: async (req, res) => {
    try {
      //   res.json({ user_id: req.user.id });
      const notes = await Notes.find({ user_id: req.user.id });
      res.json(notes);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createNotes: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      const newNote = new Notes({
        title: title,
        content: content,
        date: date,
        user_id: req.user.id,
        name: req.user.name,
      });

      //   res.json({ user_id: req.user.id, name: req.user.name });
      //   res.json({ newNote });
      await newNote.save();
      res.json({ msg: "Created Note Sucessfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  deleteNote: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ mgs: "Deleted Note Sucessfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      await Notes.findOneAndUpdate({
        title: title,
        content: content,
        date: date,
      });
      res.json({ mgs: "Updated Note Sucessfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      res.json(note);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = noteCtr;
