import { useContext } from "react";
import "./admin.css";
import { AdminContext } from "./AdminLayout";

const Dashboard = () => {
    
      const  {destinations,packages,users,bookings} = useContext(AdminContext);

  return (
    <div className="dashboard container-fluid">

      <h2 className="mb-4 text-black" >Welcome to Admin Dashboard </h2>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Destinations</h6>
              <h3>{destinations?.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Packages</h6>
              <h3>{packages?.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Bookings</h6>
              <h3>{bookings?.length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Users</h6>
              <h3>{users?.length}</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;