const express = require("express");
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require("../schemas");
const Review = require("../models/review");
const catchAsync = require("../utils/catchAsync");
const Campground = require("../models/campground");
const ExpressError = require("../utils/ExpressErrors");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController = require("../controllers/reviews");

router.post(
  "/",
  validateReview,
  isLoggedIn,
  catchAsync(reviewController.postReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviewController.deleteReview)
);

module.exports = router;
