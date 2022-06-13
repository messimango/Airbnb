import express from "express";
import AirbnbController from './airbnb.controller.js';
import ReviewsController from './reviews.controller.js';

const router = express.Router()

router.route("/").get(AirbnbController.apiGetAirbnb)
router.route("/id/:id").get(AirbnbController.apiGetAirbnbById)
router.route("/country").get(AirbnbController.apiGetAirbnbCountry)
router.route("/property_type").get(AirbnbController.apiGetAirbnbProperty)

router.route('/review')
    .post(ReviewsController.apiPostReviews)
    .put(ReviewsController.apiUpdateReviews)
    .delete(ReviewsController.apiDeleteReviews)

export default router;