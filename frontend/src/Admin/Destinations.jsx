import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { AdminContext } from "./AdminLayout";
import Api from "../Api";
import { useNavigate } from "react-router-dom";

const Destinations = () => {

  const  {destinations} = useContext(AdminContext);
  const placeInput = useRef();
  const descInput = useRef();
  const imgInput = useRef();

  const navigate = useNavigate()

  const [showForm, setShowForm] = useState(false);

  const addDestination = async (e) => {
    e.preventDefault();

    try {
    

      setShowForm(false);
      const token = sessionStorage.getItem("token");
      let place  = placeInput.current.value;
      let description = descInput.current.value
      let imageURL = imgInput.current.value
      console.log(place)
      console.log(description)
      console.log(imageURL)
      let response = await axios.post(Api.FETCH_ADMIN_DESTINATION, {place,description,imageURL}, {headers: {
          Authorization: `Bearer ${token}`,
        }},);
      alert("Destination Saved")

navigate("/admin/destinations")

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">

      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Destinations</h2>

        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
        Add Destination
        </button>
      </div>


      <div className="card p-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Place</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>

          <tbody>
            {destinations?.map((d, i) => (
              <tr key={d.id}>
                <td>{i + 1}</td>
                <td>{d.place}</td>
                <td>{d.description}</td>
                <td>
                  <img src={d.imageURL} width="60" alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h4>Add Destination</h4>

            <form onSubmit={addDestination}>

              <input ref={placeInput} type="text" name="place" placeholder="Place" className="form-control mb-2" required />
              <input ref={imgInput} type="text" name="imageURL" placeholder="Image URL" className="form-control mb-3" required/>
        <textarea ref={descInput} className="form-control mb-2" name="description" placeholder="Description" id="" required></textarea>
           

            

              <div className="d-flex justify-content-end gap-2">
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Destinations;