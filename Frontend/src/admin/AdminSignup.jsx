import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BACKEND_URL } from '../utils/utils';
const AdminSignup = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${BACKEND_URL}/admin/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      console.log("User created successfully: ", response.data)
      toast.success(response.data.message)
      navigate("/admin/login")
    } catch (error) {
      if(error.response){
        toast.error(error.response.data.errors)
        setErrorMessage(error.response.data.errors || "An error occurred while signing up.")
      }
    }
  }
  return (
    <>
    <Navbar/>
    <div className='flex justify-center items-center bg-gray-100'>
    <div className="bg-gray-200 md:p-8 p-2 rounded-lg shadow-lg w-[500px] m-2 md:m-4 mt-20">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome to <span className="text-yellow-500">CodeStack</span> Admin 
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Signup as admin To Join Us!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstname" className=" text-gray-600 mb-2">
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e)=> setFirstName(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your firstname"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className=" text-gray-400 mb-2">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                value={lastName}
                onChange={(e)=> setLastName(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your lastname"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className=" text-gray-400 mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@email.com"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className=" text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                onChange={(e)=> setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  required
                />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 cursor-pointer text-white py-3 px-6 rounded-md transition"
            >
              Signup as admin
            </button>
          </form>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default AdminSignup
