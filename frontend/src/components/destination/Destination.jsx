// import React, { useEffect, useState } from "react";
// import Navbar from "../navbar/Navbar";
// import axios from "axios";
// import Api from "../../Api";
// import './destination.css'
// import { MoveRight, Navigation } from "lucide-react";
// import Footer from "../footer/Footer";
// import { useNavigate } from "react-router-dom";
// import Chatbot from "../AIChatbot/Chatbot";

// const Destinations = () => {
//     const navigate = useNavigate()
//     const [destinations, setDestinations] = useState([]);
//     const [packages, setPackages] = useState([])

//     useEffect(() => {
//         loadDestinations();
//     }, []);

//     const loadDestinations = async () => {
//         try {
//             let destination = await axios.get(Api.FETCH_DESTINATIONS);
//             setDestinations(destination.data.destinations);

//             let packages = await axios.get(Api.FETCH_PACKAGES)
//             setPackages(packages.data)
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     return (
//         <>
//             <Navbar />

//             <div className="container mt-5">
//                 <div className=" mb-5">
//                     <h2 className="fw-bold d-flex align-items-center">Explore Destinations <Navigation size={32}/></h2>
//                     <p className="d-flex">
//                         Discover amazing places around the world
//                     </p>
//                 </div>
//                 <div className="row g-4">
//                     {destinations?.map((item) => (
//                         // <div className="col-md-4" key={item.destination_id}>

//                         //     <div className="card destination-card h-100">
//                         //         <img src={item.imageURL}className="card-img-top" />
//                         //         <div className="card-body">
//                         //             <h5 className="card-title">{item.place}</h5>
//                         //             <button onClick={() => navigate(`/destination/${item.id}`)} className="btn btn-outline-secondary">View Packages</button>
//                         //         </div>


//                         //     </div>

//                         // </div>
//                         <div className="col-md-4 mb-3" key={item.destination_id}>
//                             <div className="destination-card">

//                                 <div className="image-box">
//                                     <img src={item.imageURL} alt={item.place} />

//                                     <div className="gradient-overlay"></div>

//                                     <div className="content">
//                                         <h4>{item.place}</h4>

//                                         <button onClick={() => navigate(`/destination/${item.id}`)}>
//                                             View Packages <MoveRight size={18} />
//                                         </button>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//             <Chatbot/>

//             <Footer />
//         </>
//     );
// };

// export default Destinations;


import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import Api from "../../Api";
import './destination.css';
import { MapPin, MoveRight, Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
import Chatbot from "../AIChatbot/Chatbot";

const Destinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => { loadDestinations(); }, []);

  const loadDestinations = async () => {
    try {
      let d = await axios.get(Api.FETCH_DESTINATIONS);
      setDestinations(d.data.destinations);
      let p = await axios.get(Api.FETCH_PACKAGES);
      setPackages(p.data);
    } catch (err) { console.log(err); }
  };

  const filtered = destinations.filter(d =>
    d.place.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* ── HERO BANNER ── */}
      <div className="dest-hero">
        <div className="dest-hero__overlay" />
        <div className="dest-hero__body">
          <span className="dest-hero__pill">✦ Explore India</span>
          <h1 className="dest-hero__title">Discover Amazing <br /><em>Destinations</em></h1>
          <p className="dest-hero__sub">Find breathtaking places across India and plan your perfect journey.</p>

          {/* Inline search */}
          <div className="dest-hero__search">
            <Search size={16} className="dest-hero__search-icon" />
            <input
              type="text"
              placeholder="Search a destination…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── DESTINATIONS GRID ── */}
      <section className="dest-page-section">
        <div className="dest-page-head">
          <div>
            <p className="dp-label">All Destinations</p>
            <h2 className="dp-title">
              {filtered.length} Place{filtered.length !== 1 ? "s" : ""} to Explore
            </h2>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="dest-empty">
            <p>No destinations match "<strong>{search}</strong>"</p>
            <button onClick={() => setSearch("")}>Clear search</button>
          </div>
        ) : (
          <div className="dest-page-grid">
            {filtered.map((item) => (
              <div className="dp-card" key={item.id}>
                <div className="dp-card__img-wrap">
                  <img src={item.imageURL} alt={item.place} />
                  <div className="dp-card__overlay" />
                  <div className="dp-card__top">
                    <span className="dp-card__badge"><MapPin size={11} /> India</span>
                  </div>
                  <div className="dp-card__bottom">
                    <h4>{item.place}</h4>
                    <button onClick={() => navigate(`/destination/${item.id}`)}>
                      View Packages <MoveRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Chatbot />
      <Footer />
    </>
  );
};

export default Destinations;