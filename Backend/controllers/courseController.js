const  config  = require(".././config")
const Course = require("../models/courseModel")
const Purchase = require("../models/purchaseModel")
const cloudinary = require("cloudinary")


module.exports.createCourse = async (req,res) => {
    const adminId = req.adminId
    const {title, description, price} = req.body

    try{
        if(!title || !description || !price)
        {
            return res.status(400).json({error: "All fields are required"})
        }
    const {images} = req.files
    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({error: "No files uploaded"})
    }
    // const allowedFormat = ["images/png", "images/jpeg"]
    // if(!allowedFormat.includes(images.mimetype)){

    //     return res.status(400).json({error: "Invalid file format"})
    // }

    //Cloudinary code
    // Upload an image

    const uploadResult = await cloudinary.uploader
    .upload(images.tempFilePath)
    if(!uploadResult || uploadResult.error)
    {
        return res.status(400).json({errors: "Error in file uploading check again"})
    }
    const courseData = {
        title,
        description,
        price,
        images:{
            public_id:uploadResult.public_id,
            url:uploadResult.url
        },
        creatorId : adminId
    }
    const course = await Course.create(courseData)
    res.json({
        message: "Course created successfully",
        course,
    })
    } catch(error) {
        console.log(error)
        res.status(500).json({errors: "Error creating course"})
    }
}

module.exports.updateCourse = async (req,res) => {
    const adminId = req.adminId
    const {courseID} = req.params
    const {title, description, price, image} = req.body

    try{
        const courseSearch = await Course.findById(courseID)
        if(!courseSearch) {
            return res.status(404).json({error: "Course not found"})
        }
        const course = await Course.findOneAndUpdate({
            _id: courseID,
            creatorId: adminId
        },{
            title,
            description,
            price,
            image: {
                public_id: image?.public_id,
                url : image?.url
            }
        })
        if(!course)
            return res.status(404).json({errors: "Course can't be updated, it's created by another admin"})

        // Cloudinary code
        res.status(201).json({message: "Course updated successfully", course})
    }catch(error){
        res.status(404).json({errors: "Course updation failed"})
        console.log("Error in course updation : ", error)
    }
}

module.exports.deleteCourse = async (req,res) => {
    const adminId = req.adminId
    const {courseID} = req.params
    try{
        const course = await Course.findOneAndDelete({
            _id: courseID,
            creatorId: adminId
        })
        if(!course)
            return res.status(404).json({errors: "Course can't be deleted, it's created by another admin"})
        res.status(200).json({message: "Course deleted successfully"})
    }catch(error)
    {
        res.status(404).json({errors: "Course not found"})
        console.log("Error in course deletion : ", error)
    }
    
}

module.exports.getCourses = async (req,res) => {
    try {
        const courses = await Course.find({})
        res.status(201).json({courses})
    } catch (error) {
        res.status(500).json({errors: "Error fetching courses"})
        console.log("Error in fetching courses : ", error)
    }
}

module.exports.courseDetails = async (req,res) => {
    const {courseID} = req.params
    try{
        const course = await Course.findById(courseID)
        if(!course)
        {
            return res.status(404).json({errors: "Course not found"})
        }
        res.status(200).json({course})
    }catch(error)
    {
        res.status(500).json({errors: "Error fetching course details"})
        console.log("Error in fetching course details : ", error)
    }
}


const stripe = require("stripe")(config.STRIPE_SECRET_KEY)
// const stripePayment = new Stripe(config.STRIPE_SECRET_KEY)
// console.log(config.STRIPE_SECRET_KEY)
module.exports.buyCourses = async (req,res) => {
    const {userId} = req
    const {courseID} = req.params

    try {
        const course = await Course.findById(courseID)
        if(!course) {
            return res.status(404).json({errors: "Course not found"})
        }

        const existingPurchase = await Purchase.findOne({userId, courseID})
        if(existingPurchase) {
            return res.status(400).json({errors: "User has already purchased this course"})
        }


        //STRIPE code for payment
        const totalAmount = course.price
          // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: "usd",
        payment_method_types: ["card"],
        });


        
        res.status(201).json({
            message: "Course purchased successfully", 
            course,
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        res.status(500).json({errors: "Error in buying course"})
    }
}