const express = require("express");
const {
  getNotes,
  CreateNote,
  getNoteById,
  UpdateNote,
  DeleteNote,
 
} = require("../Controllers/notesController");
const {protect}=require('../Middleware/authMiddleware')

const router = express.Router();



router.route("/").get(protect,getNotes);

router.route("/create").post(protect, CreateNote);

router.route("/:id").get(getNoteById).put(protect, UpdateNote).delete(protect,DeleteNote)




// router
//   .route("/:id")
//   .get(getNoteById)
//   .delete(protect, DeleteNote)
//   .put(protect, UpdateNote);





module.exports = router;
