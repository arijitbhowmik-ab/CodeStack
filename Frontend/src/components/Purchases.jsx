import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BACKEND_URL } from '../utils/utils'

const Purchases = () => {
  const [courses, setCourses] = useState([])
  const [errorMessage, setErrorMessage] = useState(false)
  const [purchases, setPurchases] = useState([])
  const [userDetails, setUserDetails] = useState([])
      useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        const token = user.token
        setUserDetails(user.user)
        console.log("User: ", user.user.firstName)
          const fetchPurchases =async () => {
            if(!token)
            {
              setErrorMessage("Please login first to view your purchases")
            }
            try {
              const response = await axios.get(`${BACKEND_URL}/user/purchased`, {
                headers:{
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true
              });
              console.log("Courses fetched successfully: ", response.data.courseData)
              setPurchases(response.data.courseData)
            } catch (error) {
              setErrorMessage(error.response.data.errors || "Failed to fetch purchases. Try again."  )
              console.log("Error fetching courses: ", error)
            }
          }
          fetchPurchases()
      },[])
      console.log("All couses : ",courses)
  return (
    <div>
      <Navbar/>
      <h1 className='bg-gray-100 font-bold text-4xl p-4 text-center'>Hi, {userDetails.firstName + " " + userDetails.lastName }, Your Purchased Courses</h1>
      {
        purchases.length > 0 ? 
        (
          <div className='grid grid-cols-4 gap-0 bg-gray-100 p-4 px-15'>
            
      {
        purchases.map((purchases) => (
          
                <div key={purchases._id} className='w-74 md:w-52 lg:w-63 m-auto my-4 bg-gray-200 rounded-lg flex justify-center cursor-pointer hover:scale-102 transition-transform duration-300 transform'>
              <div className="relative h-90 w-74 md:w-52 lg:w-63 flex-shrink-0 rounded-lg p-2 px-1 shadow-md shadow-gray-300 bg-white">
                <div className='h-60 w-70 md:w-50 lg:w-61 rounded-lg overflow-hidden container mx-auto'>
                  <img className='h-60 w-70 object-cover' src={purchases.images.url} alt="" />
                </div>
                <div className='p-1'>
                  <h2 className='text-xl font-bold text-black'>{purchases.title}</h2>
                  <p>Price : &#8377;{purchases.price} &nbsp; <span className='line-through'>{purchases.price+purchases.price*20/100}</span></p>
                </div>
                <Link to={'/'} className='mx-2 bg-green-500 cursor-pointer flex justify-center text-white p-2 rounded hover:bg-green-600 duration-300 hover:text-black'>Start course</Link>
              </div>
            </div>
          ))
      }
            </div>
        ) : (
          <div className='h-100 text-center text-2xl bg-gray-100'>No course purchased</div>
        )
      }
      
      <Footer/>
    </div>
  )
}

export default Purchases
