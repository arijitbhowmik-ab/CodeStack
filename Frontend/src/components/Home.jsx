import React, { useEffect, useState } from 'react'
import logo from '../../public/logo.jpg'
import { Link } from "react-router-dom";

import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactTyped,Typed } from "react-typed";
import Navbar from './Navbar';
import Footer from './Footer';
import { BACKEND_URL } from '../utils/utils';


const Home = () => {
  const [courses, setCourses] = useState([])
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
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <>
      <div className='bg-gray-100'>
      <div className=''>
        <Navbar/>

        {/* main section */}

        <section className='text-center py-20 px-20'>
          <h1 className='md:text-6xl text-3xl font-semibold text text-yellow-500 text-center'>Welcome to LearnWithArijit</h1>
          <br /><br />
          <p className='text-2xl'>Learn here</p>
          <ReactTyped
                    className='text-orange-400 font-bold text-3xl'
                    strings={["C++", "C", "JAVA", "Python", "JavaScript", "HTML/CSS", "React", "Node.js", "MongoDB", "MySQL", "PostgreSQL", "AWS", "Docker", "GATE",]}
                    typeSpeed={40}
                    backSpeed={50}
                    loop={true}
                    />
          <p className=''>Learn and upgrade your skills</p>
          <div className='space-x-4 mt-8'>
            <Link to={"/courses"} className='bg-green-600 text-white rounded font-semibold hover:bg-green-700 duration-300 py-3 px-6'>Explore all courses </Link>
            {/* <button className='bg-white text-red rounded font-semibold hover:bg-green-600 duration-300 hover:text-black py-3 px-6'>Courses videos</button> */}
          </div>
        </section>
        <section className='mx-10 md:px-15'>

        <div className="slider-container md:py-2 mb-10">
      <Slider {...settings} className=''>
        {
          courses.map((courses) => (
            <div key={courses._id} className='rounded-lg h-92 cursor-pointer py-6'>
              <div className="relative h-80 w-48 md:w-52 xl:w-68 flex-shrink-0 rounded-lg shadow-md p-1 bg-white overflow-x-hidden  m-auto">
                <div className='h-45 w-46 md:w-50 xl:w-66 rounded-lg overflow-hidden container mx-auto '>
                  <img className='h-50 w-full  object-contain rounded-lg' src={courses.images.url} alt="" />
                </div>
                <div className='p-1 text-center'>
                  <h2 className='text-xl font-bold text-black'>{courses.title} Course</h2>
                  <Link to={'/courses'}>
                  <button  className='mt-8 w-full bg-green-600 cursor-pointer text-white p-2 rounded hover:bg-green-700 duration-300'>Join the course</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
      </Slider>
    </div>


    </section>


      </div>
      


<section className="relative bg-yellow-300 text-black py-20 text-center overflow-hidden">
  {/* Wave Layer 1 */}
  <svg
    className="absolute top-0 left-0 w-full h-32"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
  >
    <path
      fill="#facc15" // yellow-400
      fillOpacity="1"
      d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,128C840,117,960,139,1080,154.7C1200,171,1320,181,1380,186.7L1440,192V0H1380H1320H1200H1080H960H840H720H600H480H360H240H120H60H0Z"
    ></path>
  </svg>

  {/* Wave Layer 2 */}
  <svg
    className="absolute top-0 left-0 w-full h-32"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
  >
    <path
      fill="#eab308" // yellow-500
      fillOpacity="0.7"
      d="M0,224L48,202.7C96,181,192,139,288,122.7C384,107,480,117,576,133.3C672,149,768,171,864,170.7C960,171,1056,149,1152,138.7C1248,128,1344,128,1392,128L1440,128V0H1392H1344H1248H1152H1056H960H864H768H672H576H480H384H288H192H96H48H0Z"
    ></path>
  </svg>

  {/* Wave Layer 3 */}
  <svg
    className="absolute top-0 left-0 w-full h-32"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
  >
    <path
      fill="#ca8a04" // yellow-600
      fillOpacity="0.5"
      d="M0,288L60,272C120,256,240,224,360,208C480,192,600,192,720,181.3C840,171,960,149,1080,144C1200,139,1320,149,1380,154.7L1440,160V0H1380H1320H1200H1080H960H840H720H600H480H360H240H120H60H0Z"
    ></path>
  </svg>

  {/* Content */}
  <h2 className="text-2xl md:text-3xl font-bold z-10 relative mt-5">
    INDIA'S MOST LOVED TEACHING COMMUNITY <span className="text-red-600">❤️</span>
  </h2>

  <div className="mt-5 flex flex-col md:flex-row justify-center items-center gap-12 relative z-10">
    <div>
      <p className="text-3xl font-semibold">👥 6,000,000+</p>
      <p className="text-sm font-medium">Happy Learners</p>
    </div>
    <div>
      <p className="text-3xl font-semibold">📈 2 Crore+</p>
      <p className="text-sm font-medium">Monthly Views</p>
    </div>
    <div>
      <p className="text-3xl font-semibold">🔗 100,000+</p>
      <p className="text-sm font-medium">New Monthly Subscribers</p>
    </div>
  </div>
</section>


        {/* footer  */}

        <Footer/>
        </div>
    </>
  )
}

export default Home
