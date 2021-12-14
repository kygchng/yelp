const express = require("express"); //backend framework that handles API requests
const router = express.Router();

const Customer = require("../../models/Customer");
const Restaurant = require("../../models/Restaurant");
const Review = require("../../models/Review");

var ObjectId = require("mongodb").ObjectId;

router.post("/register/customer", async(req, res) => {
    const duplicate = await Customer.findOne({username: req.body.username});
    if(duplicate) {
        return res.status(400).send({});
    } else {
        const newCustomer = new Customer(req.body);
        newCustomer.save().catch(err => console.log(err));
        return res.status(200).send(newCustomer);
    }
})

router.post("/register/restaurant", async(req, res) => {
    const duplicate = await Restaurant.findOne({name: req.body.name});
    if(duplicate) {
        return res.status(400).send({});
    } else {
        const newRestaurant = new Restaurant(req.body);
        newRestaurant.save().catch(err => console.log(err));
        return res.status(200).send(newRestaurant);
    }
})

router.post("/create/review", async(req, res) => {
    const customer = await Customer.findOne({username: req.body.customer_name});
    const restaurant = await Restaurant.findOne({name: req.body.restaurant_name});

    if(customer && restaurant) {
        const newReview = new Review(req.body);
        newReview.save().catch(err => console.log(err));
        return res.status(200).send(newReview);
    } else {
        return res.status(404).send({});
    }
}) 

router.put("/edit/review/:reviewID", async(req, res) => {
    const reviewId = ObjectId(req.params.reviewID);
    const review = await Review.findById(reviewId);
    if(review) {
        const updatedValues = {
            customer_name: review.customer_name,
            restaurant_name: review.restaurant_name,
            header: req.body.header,
            text: req.body.text,
            stars: req.body.stars,
            date: review.date
        }
        await Review.findOneAndUpdate({_id: reviewId}, updatedValues);
        return res.status(200).send(review);
    } else {
        return res.status(404).send({});
    }
})

router.delete("/delete/review/:reviewID", async(req, res) => {
    const reviewId = ObjectId(req.params.reviewID);
    const review = await Review.findById(reviewId);
    if(review) {
        const deletedReview = await Review.deleteOne({_id: reviewId});
        return res.status(200).send(deletedReview);
    } else {
        //console.log("cannot find review");
        return res.status(404).send({});
    }
})

router.get("/fetch/reviews/customer/:customerName", async(req, res) => {
    const reviewList = await Review.find({customer_name: req.params.customerName});
    if(reviewList.length != 0) {
        return res.status(200).send(reviewList);
    } else {
        return res.status(404).send({});
    }
})

router.get("/fetch/reviews/restaurant/:restaurantName", async(req, res) => {
    const reviewList = await Review.find({restaurant_name: req.params.restaurantName});
    if(reviewList.length != 0) {
        return res.status(200).send(reviewList);
    } else {
        return res.status(404).send({});
    }
})

module.exports = router;