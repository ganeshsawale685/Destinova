// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../navbar/Navbar";
// import Api from "../../Api";
// import Footer from '../footer/Footer'
// import "./singlepakage.css"
// import { toast } from "react-toastify";
// import Chatbot from "../AIChatbot/Chatbot";

// const SinglePackage = () => {
//   const isLoggedIn = sessionStorage.getItem("token");
//   const { did, pid } = useParams();
//   const [pkg, setPkg] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [numPersons, setNumPersons] = useState(1);
//   const [travelDate, setTravelDate] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadPackage();
//   }, []);

//   const loadPackage = async () => {
//     try {
//       let res = await axios.get(`${Api.FETCH_PACKAGES_BY_DESTINATION}/${did}/${pid}`);
//       setPkg(res.data.packages);

//       let destRes = await axios.get(`${Api.FETCH_DESTINATIONS}/${did}`);
//       setDestination(destRes.data.destination);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const addBooking = async () => {
//     const token = sessionStorage.getItem("token");
//     if (!travelDate) {
//       toast.error("Please select travel date 📅");
//       return;
//     }
//     try {
//       let packageId = pkg.id;
//       let persons = numPersons;

//       console.log("TOKEN LENGTH:", token.length);
//       let response = await axios.post("http://localhost:3000/booking", { packageId, persons, travelDate }, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }

//       })
//       console.log(response.data)
//       setTimeout(() => {
//         navigate("/booking")
//       }, 1000)

//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const incrementPersons = () => setNumPersons(numPersons + 1);
//   const decrementPersons = () => numPersons > 1 && setNumPersons(numPersons - 1);
//   const calculateTotal = () => pkg ? (pkg.base_price* numPersons) + (pkg.hotel_price * numPersons) + (pkg.transport_cost * numPersons) : 0;

//   return (
//     <>
//       <Navbar />
//       <Chatbot />
//       <div className="container-fluid package-bg" >
//         <div className="container ">
//           <div className="row d-flex justify-content-around">
//             <div className="col-lg-10 col-xl-8 ">
//               <div className="row g-4">

//                 {/* LEFT SIDE */}
//                 <div className="col-lg-7 mr-3">
//                   <div className="left-section">

//                     <h3 className="mb-3">{pkg?.title}</h3>

//                     {/* ICON BOXES */}
//                     <div className="icon-grid">
//                       <div className="icon-box">
//                         <span>📅</span>
//                         <p>Duration</p>
//                         <h5>{pkg?.days_night}</h5>
//                       </div>

//                       <div className="icon-box">
//                         <span>💰</span>
//                         <p>Base</p>
//                         <h5>₹{pkg?.base_price}</h5>
//                       </div>

//                       <div className="icon-box">
//                         <span>🏨</span>
//                         <p>Hotel/Night</p>
//                         <h5>₹{pkg?.hotel_price}</h5>
//                       </div>

//                       <div className="icon-box">
//                         <span>🚌</span>
//                         <p>Transport</p>
//                         <h5>₹{pkg?.transport_cost}</h5>
//                       </div>
//                     </div>

//                     {/* ABOUT */}
//                     <div className="about mt-4">
//                       <h5>About this trip</h5>
//                       <p>
//                         Experience the best of {destination?.name} in this curated trip.
//                         Everything is arranged — hotel, transport, and guided tours.
//                       </p>

//                       <div className="tags">
//                         <span>✔ Guided tours</span>
//                         <span>✔ Airport transfer</span>
//                         <span>✔ Premium hotels</span>
//                         <span>✔ Local food</span>
//                         <span>✔ Free cancellation</span>
//                         <span>✔ 24/7 support</span>
//                       </div>
//                     </div>

//                   </div>
//                 </div>

//                 {/* RIGHT SIDE (BOOKING CARD) */}
//                 <div className="col-lg-5">
//                   <div className="booking-card">

//                     <span className="book-tag">BOOK THIS TRIP</span>

//                     <h1>₹{calculateTotal()}</h1>
//                     <p>1 person • {pkg?.duration_days} days</p>

//                     {/* COUNTER */}
//                     <div className="person-box">
//                       <button onClick={decrementPersons}>-</button>
//                       <h3>{numPersons}</h3>
//                       <button onClick={incrementPersons}>+</button>
//                     </div>

//                     {/* BREAKDOWN */}
//                     <div className="price-details">
//                       <div><span>Base</span><span>₹{pkg?.base_price * numPersons}</span></div>
//                       <div><span>Hotel</span><span>₹{pkg?.hotel_price * numPersons}</span></div>
//                       <div><span>Transport</span><span>₹{pkg?.transport_cost * numPersons}</span></div>

//                       <hr />

//                       <div className="total">
//                         <span>Total</span>
//                         <span>₹{calculateTotal()}</span>
//                       </div>
//                     </div>

//                     {/* TRAVEL DATE */}

//                     <div className="travel-date-section">

//                       <label className="travel-label">
//                         Select Travel Date
//                       </label>

//                       <input
//                         type="date"
//                         className="travel-date-input"
//                         value={travelDate}
//                         min={new Date().toISOString().split("T")[0]}
//                         onChange={(e) => setTravelDate(e.target.value)}
//                       />

//                       {
//                         travelDate && (
//                           <small className="selected-date">
//                             Selected: {travelDate}
//                           </small>
//                         )
//                       }

//                     </div>

//                     {/* BUTTON */}
//                     {!isLoggedIn ? (
//                       <button className="btn-book" onClick={() => navigate("/users/sign-in")} >Sign in to Book</button>
//                     ) : (
//                       <button onClick={addBooking} className="btn-book">Book Now</button>
//                     )}

//                     <small>🔒 Secure payment • Free cancellation</small>

//                   </div>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default SinglePackage;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Api from "../../Api";
import Footer from '../footer/Footer';
import "./singlepakage.css";
import { toast } from "react-toastify";
import Chatbot from "../AIChatbot/Chatbot";
import {
  Clock, Wallet, Hotel, Bus, MapPin, Star, Shield,
  Users, CalendarDays, ChevronRight, CheckCircle2, Minus, Plus
} from "lucide-react";

const FEATURES = [
  "Guided tours included",
  "Airport transfers",
  "Premium hotels",
  "Local cuisine",
  "Free cancellation",
  "24/7 support",
];

const SinglePackage = () => {
  const isLoggedIn = sessionStorage.getItem("token");
  const { did, pid } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [destination, setDestination] = useState(null);
  const [numPersons, setNumPersons] = useState(1);
  const [travelDate, setTravelDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => { loadPackage(); }, []);

  const loadPackage = async () => {
    try {
      setLoading(true);
      let res = await axios.get(`${Api.FETCH_PACKAGES_BY_DESTINATION}/${did}/${pid}`);
      setPkg(res.data.packages);
      let destRes = await axios.get(`${Api.FETCH_DESTINATIONS}/${did}`);
      setDestination(destRes.data.destination);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addBooking = async () => {
    const token = sessionStorage.getItem("token");
    if (!travelDate) { toast.error("Please select a travel date 📅"); return; }
    try {
      setBooking(true);
      let response = await axios.post("http://localhost:3000/booking",
        { packageId: pkg.id, persons: numPersons, travelDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setTimeout(() => navigate("/booking"), 1000);
    } catch (error) {
      console.log(error);
      toast.error("Booking failed. Try again.");
    } finally {
      setBooking(false);
    }
  };

  const inc = () => setNumPersons(n => n + 1);
  const dec = () => numPersons > 1 && setNumPersons(n => n - 1);
  const total = () => pkg ? (pkg.base_price + pkg.hotel_price + pkg.transport_cost) * numPersons : 0;

  return (
    <>
      <Navbar />
      <Chatbot />

      {/* ── HERO ── */}
      <div className="sp-hero">
        <div className="sp-hero__overlay" />
        <div className="sp-hero__body">
          <div className="sp-breadcrumb">
            <span onClick={() => navigate("/destinations")}>Destinations</span>
            <ChevronRight size={13} />
            <span onClick={() => navigate(`/destination/${did}`)}>{destination?.place || "Packages"}</span>
            <ChevronRight size={13} />
            <span className="active">{pkg?.title || "Package"}</span>
          </div>
          <div className="sp-hero__pill"><MapPin size={12} /> {destination?.place}</div>
          <h1 className="sp-hero__title">{pkg?.title || "Loading…"}</h1>
          <div className="sp-hero__meta">
            <span><Star size={13} fill="#f9b44a" strokeWidth={0} /> 4.8 Rating</span>
            <span><Clock size={13} /> {pkg?.days_night}</span>
            <span><Users size={13} /> Group friendly</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="sp-page">

        {/* LEFT */}
        <div className="sp-left">

          {/* Stat boxes */}
          <div className="sp-stats">
            <div className="sp-stat">
              <div className="sp-stat__icon"><Clock size={20} /></div>
              <p>Duration</p>
              <h5>{pkg?.days_night || "—"}</h5>
            </div>
            <div className="sp-stat">
              <div className="sp-stat__icon"><Wallet size={20} /></div>
              <p>Base Price</p>
              <h5>₹{pkg?.base_price?.toLocaleString()}</h5>
            </div>
            <div className="sp-stat">
              <div className="sp-stat__icon"><Hotel size={20} /></div>
              <p>Hotel/Night</p>
              <h5>₹{pkg?.hotel_price?.toLocaleString()}</h5>
            </div>
            <div className="sp-stat">
              <div className="sp-stat__icon"><Bus size={20} /></div>
              <p>Transport</p>
              <h5>₹{pkg?.transport_cost?.toLocaleString()}</h5>
            </div>
          </div>

          {/* About */}
          <div className="sp-about">
            <h3>About this trip</h3>
            <p>
              Experience the very best of {destination?.place} in this carefully curated package.
              Every detail is arranged — premium hotels, comfortable transport, and guided tours
              led by local experts who know these destinations inside out.
            </p>
          </div>

          {/* Features */}
          <div className="sp-features">
            <h3>What's included</h3>
            <div className="sp-features__grid">
              {FEATURES.map((f, i) => (
                <div className="sp-feature" key={i}>
                  <CheckCircle2 size={16} className="sp-feature__icon" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT — BOOKING CARD */}
        <div className="sp-right">
          <div className="sp-booking-card">

            <div className="sp-booking-card__top">
              <span className="sp-book-tag">Book This Trip</span>
              <div className="sp-total-price">
                <strong>₹{total().toLocaleString()}</strong>
                <small>total</small>
              </div>
            </div>

            {/* Person counter */}
            <div className="sp-counter-row">
              <div className="sp-counter-label">
                <Users size={15} />
                <span>Travelers</span>
              </div>
              <div className="sp-counter">
                <button onClick={dec} disabled={numPersons === 1}><Minus size={14} /></button>
                <span>{numPersons}</span>
                <button onClick={inc}><Plus size={14} /></button>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="sp-breakdown">
              <div className="sp-breakdown__row">
                <span>Base price × {numPersons}</span>
                <span>₹{(pkg?.base_price * numPersons)?.toLocaleString()}</span>
              </div>
              <div className="sp-breakdown__row">
                <span>Hotel × {numPersons}</span>
                <span>₹{(pkg?.hotel_price * numPersons)?.toLocaleString()}</span>
              </div>
              <div className="sp-breakdown__row">
                <span>Transport × {numPersons}</span>
                <span>₹{(pkg?.transport_cost * numPersons)?.toLocaleString()}</span>
              </div>
              <div className="sp-breakdown__divider" />
              <div className="sp-breakdown__total">
                <span>Total</span>
                <strong>₹{total().toLocaleString()}</strong>
              </div>
            </div>

            {/* Date picker */}
            <div className="sp-date-section">
              <label><CalendarDays size={14} /> Select Travel Date</label>
              <input
                type="date"
                value={travelDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={e => setTravelDate(e.target.value)}
              />
              {travelDate && (
                <small className="sp-date-confirm">
                  ✓ Departing {new Date(travelDate).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })}
                </small>
              )}
            </div>

            {/* Book button */}
            {!isLoggedIn ? (
              <button className="sp-btn-book" onClick={() => navigate("/users/sign-in")}>
                Sign In to Book
              </button>
            ) : (
              <button className="sp-btn-book" onClick={addBooking} disabled={booking}>
                {booking ? <span className="sp-spinner" /> : "Confirm Booking →"}
              </button>
            )}

            <div className="sp-secure-note">
              <Shield size={13} /> Secure payment • Free cancellation
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default SinglePackage;