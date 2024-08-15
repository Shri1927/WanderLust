const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync  = require("../utils/wrapAsync.js");
const {validateReviews, isLoggedin, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controller/reviews.js");


//Review Route
router.post("/",isLoggedin,validateReviews ,wrapAsync(reviewController.createReview));

//Delete Review Rout
router.delete("/:reviewId",isLoggedin,isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;