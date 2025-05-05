const  courseController = require("../controllers/courseController")

const express = require("express")
const userMiddleware = require("../middleware/userMiddle")
const adminMiddleware = require("../middleware/adminMiddle")
const router=express.Router()

router.post("/create", adminMiddleware, courseController.createCourse)
router.put("/update/:courseID", adminMiddleware, courseController.updateCourse)
router.delete("/delete/:courseID", adminMiddleware, courseController.deleteCourse)


router.get("/courses", courseController.getCourses)
router.get("/:courseID", courseController.courseDetails)
 
router.post("/buy/:courseID", userMiddleware, courseController.buyCourses)

module.exports = router