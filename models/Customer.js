const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema ({
    username: String,
    email: String
});

module.exports = mongoose.model("Customer", CustomerSchema);