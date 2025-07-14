const express = require('express');
const router = express.Router();
const pages = require('../Controllers/bookmark.js');
const {isAuthenticatedUser} = require('../Middlewares/authMiddlewares.js')
const formidable = require("express-formidable");

router.route("/").post(isAuthenticatedUser,pages.createBookmarks);
router.route("/").get(isAuthenticatedUser,pages.getBookmarks);
router.route("/all").get(isAuthenticatedUser,pages.getBookmarks);
router.route("/:id").get(isAuthenticatedUser,pages.getSingleBookmark);
router.route('/:id').put(isAuthenticatedUser,pages.updateSingleBookmark)
router.route('/:id').delete(isAuthenticatedUser,pages.deleteSingleBookmark)

module.exports = router;