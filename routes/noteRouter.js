const router = require("express").Router();
const auth = require("../middleware/auth");
const noteCtr = require("../controllers/notesController");

router.route("/").get(auth, noteCtr.getNotes).post(auth, noteCtr.createNotes);

router
  .route("/:id")
  .get(auth, noteCtr.getNote)
  .put(auth, noteCtr.updateNote)
  .delete(auth, noteCtr.deleteNote);

module.exports = router;
