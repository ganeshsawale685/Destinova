import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Map, Package, BookOpen, Users } from "lucide-react";
import "./admin.css";
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import Api from '../Api'

export const AdminContext = createContext()

const AdminLayout = () => {
    const navigate = useNavigate()
    const [users,setusers] = useState();
    const [destinations,setDestinations]=useState([]);
    const [bookings,setBookings] = useState();
    const [packages,setPackages] = useState();
   
    

    useEffect(()=>{
        loadData()
    },[])
    const loadData=async()=>{
     const token = sessionStorage.getItem("token");
        let destinations = await axios.get(Api.FETCH_ADMIN_DESTINATION ,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        let packages = await axios.get(Api.FETCH_ADMIN_PACAKGES,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        let users = await axios.get(Api.FETCH_ADMIN_ALLUSERS,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        let bookings = await axios.get(Api.FETCH_ADMIN_ALLBOOKINGS,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        console.log(destinations.data)
        console.log(users.data)
        console.log(bookings.data.bookings)
         setPackages(packages.data)
        setBookings(bookings.data.bookings)
        setusers(users.data.users)
        setDestinations(destinations.data.destinations)
       
    }
    const logout = ()=>{
      sessionStorage.clear();
navigate("/")
    }


  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">Destinova</h2>

        <Link to="/admin" >
          <LayoutDashboard size={18} /> Dashboard 
        </Link>

        <Link to="/admin/users">
          <Users size={18} /> Users
        </Link>

        <Link to="/admin/destinations">
          <Map size={18} /> Destinations
        </Link>

        <Link to="/admin/packages">
          <Package size={18} /> Packages
        </Link>

        <Link to="/admin/bookings">
          <BookOpen size={18} /> Bookings
        </Link>
      </div>

      {/* MAIN */}
      <div className="main-content">

        {/* TOP NAVBAR */}
        <div className="topbar d-flex justify-content-between align-items-center px-4">
          <h5 className="m-0">Admin Panel</h5>

          <div className="d-flex align-items-center gap-3">
            <span className="admin-name">Admin</span>
            <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="container-fluid">
        <AdminContext.Provider value={{destinations,packages,users,bookings}}>
         <Outlet />
        </AdminContext.Provider>
         
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;