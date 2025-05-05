import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BACKEND_URL } from '../utils/utils'

const Courses = () => {
    const [courses, setCourses] = useState([])
    //fetch the coursee
    useEffect(()=>{
        const fetchCourse =async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/course/courses`, {withCredentials: true});
            console.log("Courses fetched successfully: ", response.data.courses)
            setCourses(response.data.courses)
          } catch (error) {
            console.log("Error fetching courses: ", error)
          }
        }
        fetchCourse()
    },[])

    console.log(courses)
  return (
    <>
      <Navbar/>
      <h1 className='bg-gray-100 font-bold text-4xl p-4 text-center'>Hi, Our Courses</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 justify-center items-center  md:grid-cols-4 gap-0 bg-gray-100 p-4 overflow-auto'>
      {
        courses.map((courses) => (
                <div key={courses._id} className='w-74 md:w-52 lg:w-63  bg-white rounded-lg flex flex-wrap justify-center cursor-pointer hover:scale-102 transition-transform duration-300 transform m-auto my-4'>
              <div className="relative h-90 w-74 md:w-52 lg:w-63  flex-shrink-0 rounded-lg p-2 px-1 shadow-md shadow-gray-300">
                <div className='h-60 w-70 md:w-50 lg:w-61 rounded-lg overflow-hidden container mx-auto'>
                  <img className='h-60 w-70 object-contain' src={courses.images.url} alt="" />
                </div>
                <div className='p-1'>
                  <h2 className='text-xl font-bold text-black'>{courses.title}</h2>
                  <p>Price : &#8377;{courses.price} &nbsp; <span className='line-through'>{courses.price+courses.price*20/100}</span></p>
                </div>
                  <Link to={`/buy/${courses._id}`} className='mx-1 bg-green-500 cursor-pointer flex justify-center text-white p-2 rounded hover:bg-green-600 duration-300 hover:text-black'>Buy now</Link>
              </div>
            </div>
          ))
      }
            </div>
      <Footer/>
    </>
  )
}

export default Courses
