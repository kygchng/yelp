const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    customer_name: String,
    restaurant_name: String,
    header: String,
    text: String,
    stars: Number,
    date: String
});

module.exports = mongoose.model("Review", ReviewSchema);