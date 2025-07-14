const express = require('express');
const router = express.Router();
const pages = require('../Controllers/note.js');
const {isAuthenticatedUser} = require('../Middlewares/authMiddlewares.js')
const formidable = require("express-formidable");

router.route("/").post(pages.createNotes);
router.route("/").get(pages.getNotes);
router.route("/:id").get( pages.getSingleNote);
router.route('/:id').put(pages.UpdateSingleNote)
router.route('/:id').delete(pages.deleteSingleNote)

module.exports = router;