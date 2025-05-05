const Admin = require("../models/adminModel")
const bcryptjs = require('bcryptjs');
const z = require('zod');
const jwt = require('jsonwebtoken');
const config = require("../config");

module.exports.signup = async (req,res) => {
    const {firstName, lastName, email, password} = req.body
    const adminSchemaValidation = z.object({
        firstName: z.string().min(2, {message: "First name must be greater three character"}).max(50),
        lastName: z.string().min(0).max(50),
        email: z.string().email(),
        password: z.string().min(6, {message: "Password must be 6 length"}).max(50),
    })
    const validateData = adminSchemaValidation.safeParse(req.body)
    if(!validateData.success){
        return res.status(400).json({errors: validateData.error.issues.map(err => err.message)})
    }
    const hashedPassword = await bcryptjs.hash(password, 10)
    try {
        const existingAdmin = await Admin.findOne({email: email})
        if(existingAdmin)
        {
            return res.status(400).json({errors: "Admin already exists."})
        }
        const newAdmin = new Admin({firstName, lastName, email, password: hashedPassword})
        await newAdmin.save()
        res.status(201).json({message: "Admin created successfully."}) 
    } catch (error) {
        res.status(500).json({ errors: "Admin creation failed. Try again."})
    }
}

module.exports.login = async (req,res) => {
    const {email, password} = req.body

    try {
        const admin = await Admin.findOne({email: email})
        const isPasswordCorrect = await bcryptjs.compare(password, admin.password)
        if(!admin || !isPasswordCorrect)
        {
            return res.status(401).json({errors: "Invalid credentials."})
        }

        const token = jwt.sign({
            id: admin._id,
        }, config.JWT_ADMIN_PASSWORD,
        {expiresIn: "1d"}
        )
        const cookieOptions = { 
            expires: new Date(Date.now() + 24*60*60*1000), 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "Strict"
        }
        res.cookie("jwt", token)  //add cookie to user's browser for session management
        res.status(201).json({message: "Login successful.", admin, token})  //return jwt token here if needed
        
    } catch (error) {
        res.status(500).json({ errors: "Login failed. Try again."})
        console.log("Error: ", error)
    }
}

module.exports.logout = (req,res) => {
    try {
        if(!req.cookies.jwt){
            return res.status(401).json({message: "Kindly login first"})  // if no token is found in cookie, return unauthorized error.
        }
        res.clearCookie("jwt")
        res.status(200).json({message: "Logged out successfully."})
    } catch (error) {
        res.status(500).json({ errors: "Logout failed. Try again."})
        console.log("Error in logout: ", error)
    }
}

