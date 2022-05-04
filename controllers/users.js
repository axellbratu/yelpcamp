const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, password, username });
    const regUser = await User.register(user, password);
    req.login(regUser, (err) => {
      if (err) {
        return next();
      }
      req.flash("success", "Welcome to Yelpcamp");
      return res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/register");
  }
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", "Welcome back");
  const redirectURI = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectURI);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  req.flash("success", "See you soon!");
  res.redirect("/campgrounds");
};
