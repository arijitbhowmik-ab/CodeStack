const  userController = require("../controllers/userController")

const express = require("express")
const userMiddleware = require("../middleware/userMiddle")
const router=express.Router()

router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/logout", userController.logout)
router.get("/purchased", userMiddleware, userController.getPurchasedCourses)

module.exports = router