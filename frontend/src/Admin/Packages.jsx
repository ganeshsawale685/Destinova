import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Api from "../Api";

const Packages = () => {

  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  let addTitle = useRef()
  let addDestiId = useRef();
  let addDayNight = useRef();
  let addBasePrice = useRef();
  let addTransport = useRef();
  let addHotelPrice = useRef();
  let addDesc = useRef();


  let editTitle = useRef();
  let editDayNight = useRef();
  let editBasePrice = useRef();
  let editTransport = useRef();
  let editHotel = useRef();
  let editDesc = useRef();




  const [formData, setFormData] = useState({
    title: "",
    destinationId: "",
    days_night: "",
    base_price: "",
    transport_cost: "",
    hotel_price: "",
    description: ""
  });

  //  LOAD DATA
  const loadPackages = async () => {
    const token = sessionStorage.getItem("token");
    let res = await axios.get(Api.FETCH_PACKAGES,{headers: {
          Authorization: `Bearer ${token}`,
        }});
    setPackages(res.data.packages || res.data);
  };

  const loadDestinations = async () => {
    const token = sessionStorage.getItem("token");
    let res = await axios.get(Api.FETCH_ADMIN_DESTINATION,{headers: {
          Authorization: `Bearer ${token}`,
        }});
    setDestinations(res.data.destinations);
  };

  useEffect(() => {
    loadPackages();
    loadDestinations();
  }, []);

  // HANDLE CHANGE



 
  const addPackage = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    console.log(addTitle.current.value)
    const addData = {
      title: addTitle.current.value,
      destinationId: addDestiId.current.value,
      days_night: addDayNight.current.value,
      base_price: addBasePrice.current.value,
      transport_cost: addTransport.current.value,
      hotel_price: addHotelPrice.current.value,
      description: addDesc.current.value
    }
    console.log(addData)


    await axios.post(Api.FETCH_ADMIN_ADDPACKAGE, addData,{headers: {
          Authorization: `Bearer ${token}`,
        }});

    setShowAdd(false);
    loadPackages();
    window.reload()
  };

  //  UPDATE
  const updatePackage = async () => {
    const token = sessionStorage.getItem("token");
    await axios.put(
      `${Api.FETCH_ADMIN_ADDPACKAGE}/${selectedPackage.id}`,
      selectedPackage,{headers: {
          Authorization: `Bearer ${token}`,
        }}
    );
    console.log(selectedPackage)
    setIsEdit(false);
    loadPackages();
  };

  //  DELETE
  const deletePackage = async (id) => {
    const token = sessionStorage.getItem("token");
    await axios.delete(`${Api.FETCH_ADMIN_ADDPACKAGE}/${id}`,{headers: {
          Authorization: `Bearer ${token}`,
        }});
    setSelectedPackage(null);
    loadPackages();
  };

  return (
    <div className="container-fluid">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Packages</h2>

        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          ➕ Add Package
        </button>
      </div>

      {/*  CARD UI */}
      <div className="row g-4">
        {packages.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card shadow-sm h-100">

              <div className="card-body">
                <h5>{p.title}</h5>
                <p>{p.days_night}</p>
                <h6 className="text-primary">₹{p.base_price}</h6>
              </div>

              <div className="card-footer">
                <button
                  className="btn btn-dark w-100"
                  onClick={() => {
                    setSelectedPackage(p);
                    setIsEdit(false);
                  }}
                >
                  View Details
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ================= ADD MODAL ================= */}
      {showAdd && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ width: "500px" }}>

            <h4>Add Package</h4>

            <form onSubmit={addPackage}>

              <input ref={addTitle} name="title" placeholder="Title" className="form-control mb-2" required/>

              {/* DESTINATION DROPDOWN */}
              <select ref={addDestiId} name="destinationId" className="form-control mb-2" >
                <option value="">Select Destination</option>
                {destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.place}</option>
                ))}
              </select>

              <input ref={addDayNight} name="days_night" type="text" placeholder="Days/Nights" className="form-control mb-2" required />
              <input ref={addBasePrice} name="base_price" placeholder="Base Price" type="text" className="form-control mb-2" required />
              <input ref={addTransport} name="transport_cost" placeholder="Transport Cost" type="text" className="form-control mb-2" required />
              <input ref={addHotelPrice} name="hotel_price" placeholder="Hotel Price" type="text" className="form-control mb-2" required />
              <textarea ref={addDesc} name="description" placeholder="Description" className="form-control mb-3" required />

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAdd(false)}>
                  Cancel
                </button>
                <button className="btn btn-success">Save</button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ================= DETAIL MODAL ================= */}
      {selectedPackage && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ width: "500px" }}>

            <h4>Package Details</h4>

            <label>Title</label>
            <input
              name="title"
              className="form-control mb-2"
              value={selectedPackage.title}
              disabled={!isEdit}
              onChange={(e) =>
                setSelectedPackage({
                  ...selectedPackage,
                  title: e.target.value
                })
              }
            />

            <label>Day/Night</label>
            <input
              name="days_night"
              className="form-control mb-2"
              value={selectedPackage.days_night}
              disabled={!isEdit}
              onChange={(e) =>
                setSelectedPackage({
                  ...selectedPackage,
                  days_night: e.target.value
                })
              }
            />

            <label>Base Price</label>
            <input
              name="base_price"
              className="form-control mb-2"
              value={selectedPackage.base_price}
              disabled={!isEdit}
              onChange={(e) =>
                setSelectedPackage({
                  ...selectedPackage,
                  base_price: e.target.value
                })
              }
            />

            <label>Transport Cost</label>
            <input
              name="transport_cost"
              className="form-control mb-2"
              value={selectedPackage.transport_cost}
              disabled={!isEdit}
              onChange={(e) =>
                setSelectedPackage({
                  ...selectedPackage,
                  transport_cost: e.target.value
                })
              }
            />

            <label>Hotel Price</label>
            <input
              name="hotel_price"
              className="form-control mb-2"
              value={selectedPackage.hotel_price}
              disabled={!isEdit}
              onChange={(e) =>
                setSelectedPackage({
                  ...selectedPackage,
                  hotel_price: e.target.value
                })
              }
            />

            <label>Description</label>
            <textarea
              name="description"
              className="form-control mb-3"
              value={selectedPackage.description}
              disabled={!isEdit}
              onChange={(e) =>
                setSelectedPackage({
                  ...selectedPackage,
                  description: e.target.value
                })
              }
            />
            <div className="d-flex justify-content-between">

              {!isEdit ? (
                <button className="btn btn-warning" onClick={() => setIsEdit(true)}>
                  Edit
                </button>
              ) : (
                <button className="btn btn-success" onClick={updatePackage}>
                  Save
                </button>
              )}

              <div className="d-flex gap-2">
                <button className="btn btn-danger" onClick={() => deletePackage(selectedPackage.id)}>
                  Delete
                </button>

                <button className="btn btn-secondary" onClick={() => setSelectedPackage(null)}>
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Packages;