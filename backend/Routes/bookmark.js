const express = require('express');
const router = express.Router();
const pages = require('../Controllers/bookmark.js');
const {isAuthenticatedUser} = require('../Middlewares/authMiddlewares.js')
const formidable = require("express-formidable");

router.route("/").post(pages.register);
router.route("/").get(pages.login);
router.route("/:id").get(isAuthenticatedUser, pages.profile);
router.route('/:id').put(pages.photo)
router.route('/:id').delete(isAuthenticatedUser,formidable(),pages.updateProfile)

module.exports = router;