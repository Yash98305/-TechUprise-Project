const express = require('express');
const router = express.Router();
const pages = require('../Controllers/note.js');
const {isAuthenticatedUser} = require('../Middlewares/authMiddlewares.js')
const formidable = require("express-formidable");

router.route("/").post(isAuthenticatedUser,pages.createNotes);
router.route("/").get(isAuthenticatedUser,pages.getNotes);
router.route("/:id").get(isAuthenticatedUser,pages.getSingleNote);
router.route('/:id').put(isAuthenticatedUser,pages.UpdateSingleNote)
router.route('/:id').delete(isAuthenticatedUser,pages.deleteSingleNote)

module.exports = router;