import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Courses from './components/Courses';
import Purchases from './components/Purchases';
import Buy from './components/Buy';
import AdminLogin from './admin/AdminLogin';
import AdminSignup from './admin/AdminSignup';
import Dashboard from './admin/Dashboard';
import CourseCreate from './admin/CourseCreate';
import UpdateCourse from './admin/UpdateCourse';
import OurCourses from './admin/OurCourses';
const App = () => {

  const user = JSON.parse(localStorage.getItem('user'))
  const admin = JSON.parse(localStorage.getItem('admin'))
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/courses" element={<Courses />} />
      <Route path="/purchases" element={user? <Purchases /> : <Navigate to={'/login'}/>} />
      <Route path="/buy/:courseID" element={<Buy />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />
      <Route path="/admin/dashboard" element={admin? <Dashboard /> : <Navigate to={'/admin/login'}/>} />
      <Route path="/admin/createcourse" element={<CourseCreate />} />
      <Route path="/admin/updatecourse/:id" element={<UpdateCourse />} />
      <Route path="/admin/ourcourses" element={<OurCourses />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  )
}

export default App

