const express = require('express');
const router = express.Router();
const pages = require('../Controllers/note.js');
const {isAuthenticatedUser} = require('../Middlewares/authMiddlewares.js')
const formidable = require("express-formidable");

router.route("/").post(isAuthenticatedUser,pages.createNotes);
router.route("/").get(isAuthenticatedUser,pages.getFilteredNotes);
router.route("/all").get(isAuthenticatedUser,pages.getAllNotes);
router.route('/favorite').get(isAuthenticatedUser,pages.getFavoriteNotes)
router.route('/favorite/:id').put(isAuthenticatedUser,pages.UpdateFavorite)
router.route("/:id").get(isAuthenticatedUser,pages.getSingleNote);
router.route('/:id').put(isAuthenticatedUser,pages.UpdateSingleNote)
router.route('/:id').delete(isAuthenticatedUser,pages.deleteSingleNote)

module.exports = router;