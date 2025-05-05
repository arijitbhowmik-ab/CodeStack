const  adminController = require("../controllers/adminController")

const express = require("express")
const adminMiddleware = require("../middleware/adminMiddle")
const router=express.Router()

router.post("/signup", adminController.signup)
router.post("/login", adminController.login)
router.get("/logout", adminController.logout)

module.exports = router