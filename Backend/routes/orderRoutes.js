const  userController = require("../controllers/userController")
const  orderController = require("../controllers/orderController")

const express = require("express")
const userMiddleware = require("../middleware/userMiddle")
const router=express.Router()

router.post("/",userMiddleware, orderController.orderDetails)


module.exports = router