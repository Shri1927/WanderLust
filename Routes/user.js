const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirect } = require("../middleware.js");
const userController = require("../controller/users.js");

router.get("/signup" , userController.getSignUp);

router.post("/signup" , wrapAsync(userController.postSignUp));

router.get("/login" , userController.getLogin);

router.post("/login",saveRedirect, passport.authenticate("local",{failureRedirect:"/login" , failureFlash:true}),userController.postLogin);

router.get("/logout", userController.getLogout);

module.exports = router;