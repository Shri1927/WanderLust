const express = require("express");
const router = express.Router();
const wrapAsync  = require("../utils/wrapAsync.js");
const {isLoggedin, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const listing = require("../models/listing.js");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})


  //Index Route
router.get("/", wrapAsync(listingController.index));
  
  //New Route
router.get("/new",
isLoggedin,
listingController.renderNewForm
);
  
  //Show Route
router.get("/:id",
 wrapAsync(listingController.showListings)
);

  //Create Route
   router.post("/",
   isLoggedin,
   upload.single("listing[image]"), 
   validateListing,wrapAsync(listingController.createListing));

  //Edit Route
router.get("/:id/edit",
isOwner,wrapAsync(listingController.editListing));
  
  //Update Route
router.put("/:id",
isLoggedin,
isOwner, 
upload.single("listing[image]"),
validateListing,
wrapAsync(listingController.updateListing));
  
  //Delete Route
router.delete("/:id",
 isLoggedin , isOwner,wrapAsync(listingController.deleteListing));

module.exports = router;