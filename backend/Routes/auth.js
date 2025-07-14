const express = require('express');
const router = express.Router();
const pages = require('../Controllers/auth.js');
const {isAuthenticatedUser} = require('../Middlewares/authMiddlewares.js')
const formidable = require("express-formidable");


router.route("/register").post(pages.register);
router.route("/login").post(pages.login);
router.route("/profile").get(isAuthenticatedUser, pages.profile);
router.route('/photo/:id').get(pages.photo)
router.route('/update').put(isAuthenticatedUser,formidable(),pages.updateProfile)

module.exports = router;