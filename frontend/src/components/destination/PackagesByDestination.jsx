// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../navbar/Navbar";
// import Api from "../../Api";
// import './destination.css'
// import Footer from "../footer/Footer";
// import { Box } from "lucide-react";
// import Chatbot from "../AIChatbot/Chatbot";
// const PackagesByDestination = () => {

//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     loadPackages();
//   }, [id]);

//   const loadPackages = async () => {
//     try {
//       let destinationPackage = await axios.get(`${Api.FETCH_PACKAGES_BY_DESTINATION}/${id}`);

//       console.log(destinationPackage.data);
//       setPackages(destinationPackage.data.destination.packages)
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//     <Chatbot/>
//       <div className="packages">
//         <Navbar />

//         <div className="container mt-5 packages" >
//           <h2 className="mb-4">Packages <span><Box size={30} /></span></h2>

//           <div className="row g-4">
//             {packages?.map((item, index) => {
//               return (
//                 // <div className="col-md-4 mb-2" key={item.id}>

//                 //     <div className="card h-150 p-3">

//                 //         <div className="card-body">
//                 //             <div className="border rounded p-4">

//                 //                 <h5 className="card-title">{item.title}</h5>
//                 //                 <p className="card-text">{item.description}</p>

//                 //                 <div className="d-flex mt-3 gap-3 flex-wrap">
//                 //                     <small>🏨 Rs:{item.hotel_price}/Night</small>
//                 //                     <small>🚌 Rs:{item.transport_cost}/Transport</small>
//                 //                     <small>📅 {item.days_night.split(" ")[0]} Days</small>
//                 //                 </div>

//                 //             </div>

//                 //             <div className="d-flex align-items-center p-3">
//                 //                 <h4 className="text-success mt-3">Rs:{item.base_price}</h4>
//                 //                 <small className="mt-3 ms-2">/ Person</small>
//                 //             </div>

//                 //             <div className="d-flex gap-3 mt-1 p-3">
//                 //                 <button onClick={() => navigate(`/destination/${item.destinationId}/${item.id}`)} className="btn btn-outline-primary">Details</button>
//                 //                 <button className="btn btn-warning">Book</button>
//                 //             </div>

//                 //         </div>

//                 //     </div>

//                 // </div>
//                 <div className="col-md-4 mb-4" key={item.id}>
//                   <div className="package-card">

//                     {/* TOP BADGE */}
//                     <span className="package-badge mb-4">
//                       {item.days_night.split(" ")[0]} Days
//                     </span> <br />

//                     {/* BODY */}
//                     <div className="package-content mt-2">
//                       <h5>{item.title}</h5>
//                       <p>{item.description}</p>

//                       <div className="package-info">
//                         <span>🏨 ₹{item.hotel_price}/Night</span>
//                         <span>🚌 ₹{item.transport_cost}</span>
//                       </div>

//                       {/* PRICE */}
//                       <div className="price-box">
//                         <h4>₹{item.base_price}</h4>
//                         <small>/person</small>
//                       </div>

//                       {/* BUTTONS */}
//                       <div className="btn-group-custom">
//                         <button
//                           onClick={() => navigate(`/destination/${item.destinationId}/${item.id}`)}
//                           className="btn-outline-custom w-100"
//                         >
//                           Details
//                         </button>

                        
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default PackagesByDestination;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Api from "../../Api";
import './packagesByDest.css';
import Footer from "../footer/Footer";
import { Clock, Hotel, Bus, MapPin, Star, ArrowRight, Package } from "lucide-react";
import Chatbot from "../AIChatbot/Chatbot";

const PackagesByDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [destName, setDestName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadPackages(); }, [id]);

  const loadPackages = async () => {
    try {
      setLoading(true);
      let res = await axios.get(`${Api.FETCH_PACKAGES_BY_DESTINATION}/${id}`);
      setPackages(res.data.destination.packages);
      setDestName(res.data.destination.place || "");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Chatbot />

      {/* ── HERO BANNER ── */}
      <div className="pkgdest-hero">
        <div className="pkgdest-hero__overlay" />
        <div className="pkgdest-hero__body">
          <div className="pkgdest-hero__breadcrumb">
            <span onClick={() => navigate("/destinations")}>Destinations</span>
            <ArrowRight size={13} />
            <span className="active">{destName || "Packages"}</span>
          </div>
          <span className="pkgdest-hero__pill"><MapPin size={12} /> {destName || "Destination"}</span>
          <h1 className="pkgdest-hero__title">
            Travel <em>Packages</em>
          </h1>
          <p className="pkgdest-hero__sub">
            Choose from our handpicked packages — each crafted for an unforgettable experience.
          </p>
          <div className="pkgdest-hero__meta">
            <span><Package size={14} /> {packages.length} Package{packages.length !== 1 ? "s" : ""} Available</span>
            <span><Star size={14} fill="#f9b44a" strokeWidth={0} /> 4.8 Avg Rating</span>
          </div>
        </div>
      </div>

      {/* ── PACKAGES GRID ── */}
      <section className="pkgdest-section">
        <div className="pkgdest-head">
          <p className="pkgdest-label">Handpicked for you</p>
          <h2 className="pkgdest-title">Available Packages</h2>
        </div>

        {loading ? (
          <div className="pkgdest-loading">
            <div className="pkgdest-spinner" />
            <p>Loading packages…</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="pkgdest-empty">
            <p>No packages found for this destination.</p>
            <button onClick={() => navigate("/destinations")}>← Back to Destinations</button>
          </div>
        ) : (
          <div className="pkgdest-grid">
            {packages.map((item) => (
              <div className="pkg-card" key={item.id}>

                {/* Header strip */}
                <div className="pkg-card__header">
                  <span className="pkg-card__tag">
                    <Star size={11} fill="#f9b44a" strokeWidth={0} /> Featured
                  </span>
                  <span className="pkg-card__days">
                    <Clock size={12} /> {item.days_night.split(" ")[0]} Days
                  </span>
                </div>

                {/* Body */}
                <div className="pkg-card__body">
                  <h4 className="pkg-card__title">{item.title}</h4>
                  <p className="pkg-card__desc">{item.description}</p>

                  {/* Meta pills */}
                  <div className="pkg-card__meta">
                    <span className="pkg-pill"><Hotel size={12} /> ₹{item.hotel_price}/Night</span>
                    <span className="pkg-pill"><Bus size={12} /> ₹{item.transport_cost} transport</span>
                    <span className="pkg-pill"><Clock size={12} /> {item.days_night}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="pkg-card__footer">
                  <div className="pkg-card__price">
                    <span className="pkg-price-lbl">Starting from</span>
                    <div className="pkg-price-row">
                      <strong>₹{item.base_price}</strong>
                      <small>/person</small>
                    </div>
                  </div>
                  <button
                    className="pkg-card__btn"
                    onClick={() => navigate(`/destination/${item.destinationId}/${item.id}`)}
                  >
                    View Details <ArrowRight size={14} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default PackagesByDestination;