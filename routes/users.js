const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const userController = require("../controllers/users");

router
  .route("/register")
  .get(userController.renderRegister)
  .post(catchAsync(userController.registerUser));

router
  .route("/login")
  .get(userController.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    catchAsync(userController.loginUser)
  );

router.get("/logout", userController.logoutUser);

module.exports = router;
