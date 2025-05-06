import React from 'react'
import logo from '../../public/logo.jpg'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <footer className='bg-amber-50 px-20'>
            <div className='grid grid-cols-1 md:grid-cols-3 px-5 py-2 border-t border-white items-center'>
              
              <div className='flex flex-col items-center'>
              <div className='flex items-center space-x-2'>
                <img src={logo} alt="" className='rounded-full w-12 h-12'/>
                <h1 className='text-2xl font-bold text-yellow-500'>CodeStack</h1>
              </div>
                <div className='mt-3 ml-2 md:ml-8'>
                  <p>Follow us</p>
                  <div className='flex space-x-4'>
                    <a href=""><FaGithub className='text-2xl hover:text-orange-700'/></a>
                    <a href=""><FaLinkedin className='text-2xl hover:text-blue-700'/></a>
                    <a href=""><FaInstagramSquare className='text-2xl hover:text-pink-700'/></a>
                  </div>
                </div>
              </div>
              

              <div className='item-center flex flex-col items-center'>
                <h3 className='text-lg font-semibold mb-4'>Connects</h3>
                <ul className='space-y-2 text-black items-center'>
                  <li className='flex items-center'>
                   <FaYoutube className='mx-2 text-2xl hover:text-red-600 cursor-pointer'/> Youtube learn coding
                  </li>
                  <li className='flex items-center'><FaTelegramPlane className='mx-2 text-2xl hover:text-blue-400 cursor-pointer'/>Telegram learn coding</li>
                  <li className='flex items-center'><FaGithub className='mx-2 text-2xl hover:text-orange-700 cursor-pointer'/>Github learn coding</li>
                  
                </ul>
              </div>


              <div className='item-center flex flex-col  items-center'>
                <h3 className='text-lg font-semibold mb-4 text-center'>Copyrights &copy; 2025</h3>
                <ul className='space-y-2 text-black'>
                  <li className='flex items-center'>
                   Terms and conditions
                  </li>
                  <li>Privacy policy</li>
                  <li>Refund and cancellation</li>
                  <Link to={"/admin/login"} className=''>Admin Login</Link>
                </ul>
              </div>
            </div>
        </footer>
    </>
  )
}

export default Footer
