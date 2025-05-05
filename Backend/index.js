const express = require("express")
const app = express()
const dotenv = require("dotenv")
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose")
const PORT=8080
const dbUrl ="mongodb+srv://arijit0628:Arijit2002@cluster0.eoxpjcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const courseRoute = require('./routes/courseRoutes');
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const orderRoute = require('./routes/orderRoutes');
const cookieParser = require('cookie-parser')
const cloudinary = require("cloudinary")
const cors = require('cors')
dotenv.config()

//middleware

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


app.use(cors({
    origin: process.env.FRONTEND_URL, // replace with your frontend URL,
    credentials: true, // enable Set-Cookie headers
    methods: ['GET, POST, PUT, DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
 }))
 
main().then(()=>{
    console.log("Connected with MongoDb")
}).catch((err) =>{
    console.log("Error : ", err)
})

async function main() {
    await mongoose.connect(dbUrl)
}
app.use("/api/v1/course", courseRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1/order", orderRoute)

//Cloudinary Configuration
// Configuration
cloudinary.config({ 
    cloud_name: 'ddiyphxgb', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
});
app.get('/', (req,res)=>{
    res.send("You are in the root directory")
})
app.listen(PORT, ()=> {
    console.log("Server listening on port ", PORT)
})