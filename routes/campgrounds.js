const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const campgroundControllers = require("../controllers/campgrounds");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

router
  .route("/")
  .get(catchAsync(campgroundControllers.index))
  .post(
    validateCampground,
    isLoggedIn,
    catchAsync(campgroundControllers.createCamp)
  );
router.get("/new", isLoggedIn, campgroundControllers.newForm);

router
  .route("/:id")
  .get(catchAsync(campgroundControllers.getCamp))
  .put(
    validateCampground,
    isLoggedIn,
    isAuthor,
    catchAsync(campgroundControllers.updateCamp)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgroundControllers.deleteCamp));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgroundControllers.editCamp)
);

module.exports = router;
