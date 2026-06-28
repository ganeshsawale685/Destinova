import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Destination from './components/destination/Destination'
import PackagesByDestination from './components/destination/PackagesByDestination'
import SinglePackage from './components/destination/SinglePackage'
import SignIn from './components/user/SignIn'
import SignUp from './components/user/SignUp'
import { ToastContainer } from "react-toastify";
import Booking from './components/booking/Booking'
import AdminLayout from './Admin/AdminLayout'
import Dashboard from './Admin/Dashboard'
import Destinations from './Admin/Destinations'
import Packages from './Admin/Packages'
import Users from './Admin/Users'
import Bookings from './Admin/Bookings'

function App() {

  return (
   <>
  
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/destinations' element={<Destination/>}/>
    <Route path="/destination/:id" element={<PackagesByDestination />} />
    <Route path="/destination/:did/:pid" element={<SinglePackage />} />
    <Route path='/booking' element={<Booking/>}/>
    <Route path="/users/sign-in" element={<SignIn/>} />
    <Route path="/users/sign-up" element={<SignUp/>} />

     {/* ADMIN */}
       <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="destinations" element={<Destinations/>} />
          <Route path="packages" element={<Packages/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='bookings' element={<Bookings/>}/>
        </Route>
   </Routes>
      <ToastContainer />
   </>
  )
}

export default App
