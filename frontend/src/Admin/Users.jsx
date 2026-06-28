import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Api from "../Api";
import './admin.css'
import { AdminContext } from "./AdminLayout";

const Users = () => {

    const {users} = useContext(AdminContext)

  // const [selectedUser, setSelectedUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);


  // const loadUsers = async () => {
  //   let res = await axios.get(Api.FETCH_USERS);
  //   setUsers(res.data.users || res.data);
  // };

  // useEffect(() => {
  //   loadUsers();
  // }, []);

  // const handleChange = (e) => {
  //   setSelectedUser({
  //     ...selectedUser,
  //     [e.target.name]: e.target.value
  //   });
  // };





  return (
    <div className="container-fluid">

      <h2 className="mb-4">Users</h2>

   
      <div className="card p-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.role === "admin" ? "bg-danger" : "bg-primary"}`}>
                    {u.role}
                  </span>
                </td>
                <td>
                  {/* <button 
                    className="btn btn-dark btn-sm"
                    onClick={() => {
                      setSelectedUser(u);
                      setIsEdit(false);
                    }}
                  >
                    View
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* {selectedUser && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ width: "400px" }}>

            <h4>User Details</h4>

            <label>Name</label>
            <input
              name="name"
              className="form-control mb-2"
              value={selectedUser.name}
              disabled={!isEdit}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              name="email"
              className="form-control mb-2"
              value={selectedUser.email}
              disabled={!isEdit}
              onChange={handleChange}
            />

            <label>Role</label>
            <select
              name="role"
              className="form-control mb-3"
              value={selectedUser.role}
              disabled={!isEdit}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="d-flex justify-content-between">

              {!isEdit ? (
                <button className="btn btn-warning" onClick={() => setIsEdit(true)}>
                  Edit
                </button>
              ) : (
                <button className="btn btn-success" onClick={updateUser}>
                  Save
                </button>
              )}

              <div className="d-flex gap-2">
                <button className="btn btn-danger" onClick={() => deleteUser(selectedUser.id)}>
                  Delete
                </button>

                <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )} */}

    </div>
  );
};

export default Users;