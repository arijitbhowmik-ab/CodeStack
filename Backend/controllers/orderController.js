const Order = require("../models/orderModel")
const Purchase = require("../models/purchaseModel")

module.exports.orderDetails = async (req,res) => {
    const order = req.body

    try {
        const orderInfo = await Order.create(order)
        console.log("Order created successfully: ", orderInfo)

        const userId = orderInfo?.userId
        const courseID = orderInfo?.courseID

        res.status(200).json({message: "Order created successfully", orderInfo})

        if(orderInfo)
        {
            await Purchase.create({userId, courseID})
        }

    } catch (error) {
        console.log("Error in order : ",error)
        res.status(401).json({ errors: "Error creating order"})
    }
}