const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: String,
    email: String,
    userId: String,
    courseID: String,
    paymentIntentId: String,
    amount: Number,
    status: String
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
