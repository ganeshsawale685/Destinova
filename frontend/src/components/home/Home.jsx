// import React, { useEffect, useState } from "react";
// import Navbar from "../navbar/Navbar";
// import axios from 'axios'
// import Api from "../../Api";
// import "./home.css";
// import { Bus, Map, CalendarCheck, Hotel, MapPin, MoveRight } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import Footer from "../footer/Footer";
// import Chatbot from "../AIChatbot/Chatbot";


// const Home = () => {
//     const isLoggedIn = sessionStorage.getItem("token");
//     const navigate = useNavigate()
//     const [destinations, setDestination] = useState()
//     const [packages, setPackages] = useState()

//     useEffect(() => {
//         loadDestination()
//     }, [])

//     const loadDestination = async () => {
//         let destination = await axios.get(Api.FETCH_DESTINATIONS);
//         setDestination(destination.data.destinations.slice(0, 3));

//         let packages = await axios.get(Api.FETCH_PACKAGES)
//         setPackages(packages.data.slice(0, 3))
//     }
//     return (
//         <>
//             <Navbar />
//             <div className="hero-section d-flex align-items-center">
//                 <div className="container">
//                     <div className="row align-items-center">

//                         <h1 className="hero-title animate-slide">
//                             Explore the <br />
//                             <span className="highlight">India's</span> <br />
//                             Most Beautiful <br />
//                             Places
//                         </h1>

//                         <p className="hero-desc animate-fade">
//                             Handcrafted journeys to breathtaking destinations. <br />
//                             Plan, book, and travel — effortlessly.
//                         </p>

//                         <div className="d-flex gap-3 mt-4 animate-scale">
//                             <button onClick={() => navigate('/destinations')} className="btn btn-orange">
//                                 View Destinations →
//                             </button>
//                         </div>

//                         <div className="stats d-flex gap-4 mt-4 animate-up">
//                             <span>✈ 24 Packages</span>
//                             <span>🌍 6 Destinations</span>
//                             <span>⭐ 4.8 Rating</span>
//                             <span>👥 500+ Travelers</span>
//                         </div>





//                     </div>
//                 </div>
//             </div>

//             <div className="container mt-5">
//                 <div className="d-flex justify-content-between align-items-center">
//                     <h3 className="mb-4 fw-bold">Popular Destinations <span>< MapPin size={28} /></span></h3>
//                     <button onClick={() => navigate("/destinations")} className="btn btn-outline-danger">See All</button>
//                 </div>

//                 <div className="row mt-3">
//                     {destinations?.map((item, index) => (
//                         // <div className="col-md-4 " key={index}>
//                         //     <div className="card shadow-sm mb-4">

//                         //         <img
//                         //             src={item.imageURL}
//                         //             className="card-img-top"
//                         //             alt={item.city_name}
//                         //         />

//                         //         <div className="card-body">
//                         //             <h5 className="card-title">{item.place}</h5>
//                         //             <button onClick={() => navigate(`/destination/${item.id}`)} className="btn btn-outline-primary mt-2">Explore  <MoveRight /> </button>
//                         //         </div>

//                         //     </div>
//                         // </div>
//                         <div className="col-md-4" key={index}>
//                             <div className="destination-card">

//                                 <div className="img-wrapper">
//                                     <img src={item.imageURL} alt={item.place} />
//                                     <div className="overlay">
//                                         <h5>{item.place}</h5>
//                                         <button onClick={() => navigate(`/destination/${item.id}`)}>
//                                             Explore <MoveRight size={18} />
//                                         </button>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//             <Chatbot />

//             <section className="why-section container">
//                     <div className="page-wrap">
//                       <div className="why-grid">
//                         <div className="why-text">
//                           <p className="label-sm">Why Destinova</p>
//                           <h2 className="display-md" style={{ marginTop: 12, marginBottom: 20 }}>
//                             Everything taken care of — so you can simply explore
//                           </h2>
//                           <p style={{ color: "var(--stone-500)", fontSize: 15, lineHeight: 1.75 }}>
//                             From the moment you book to the second you return home, our team ensures every detail is handled with care and expertise.
//                           </p>
//                         </div>
//                         <div className="why-cards">
//                           {[
//                             { icon: <Hotel size={20} strokeWidth={1.5} />, label: "Premium Hotels", desc: "Carefully vetted accommodations at every price point" },
//                             { icon: <Bus size={20} strokeWidth={1.5} />, label: "Hassle-Free Transport", desc: "Airport pickups, intercity travel, all arranged" },
//                             { icon: <CalendarCheck size={20} strokeWidth={1.5} />, label: "Flexible Planning", desc: "Customise itineraries to fit your schedule and budget" },
//                           ].map((f, i) => (
//                             <div key={i} className="why-card">
//                               <div className="why-card__icon">{f.icon}</div>
//                               <div>
//                                 <h4>{f.label}</h4>
//                                 <p>{f.desc}</p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </section>


//             <div className="packages">
//                 <div className="container mt-5 packages">

//                     {/* Heading */}
//                     <div className="d-flex justify-content-between align-items-center m-4 p-3">
//                         <div>
//                             <small className="small-tag">HANDPICKED FOR YOU</small>
//                             <h2 className="fw-bold">Top Travel Packages <Map size={28} /></h2>
//                         </div>


//                     </div>
//                     <div className="row g-4">
//                         {packages?.map((item, index) => {
//                             return (

//                                 <div className="col-md-4 mb-4" key={item.id}>
//                                     <div className="package-card">

//                                         <div className="package-body">
//                                             <h5>{item.title}</h5>
//                                             <p>{item.description}</p>

//                                             <div className="package-info">
//                                                 <span>🏨 ₹{item.hotel_price}/Night</span>
//                                                 <span>🚌 ₹{item.transport_cost}</span>
//                                                 <span>📅 {item.days_night.split(" ")[0]} Days</span>
//                                             </div>

//                                             <div className="price-section">
//                                                 <h4>₹{item.base_price}</h4>
//                                                 <small>/person</small>
//                                             </div>

//                                             {!isLoggedIn ? (
//                                                 <button onClick={() => navigate("/users/sign-in")} className="btn-primary-custom">
//                                                     View Package
//                                                 </button>
//                                             ) : (
//                                                 <button onClick={() => navigate(`/destination/${item.destinationId}/${item.id}`)} className="btn-warning-custom">
//                                                     Book Now
//                                                 </button>
//                                             )}
//                                         </div>

//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>

//                 </div>
//             </div>

//             <Footer />
//             {/* <AIChatbot/> */}
//         </>
//     );
// };

// export default Home;


//-----------------------------------------
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import Api from "../../Api";
import "./home.css";
import { Bus, Map, CalendarCheck, Hotel, MapPin, MoveRight, Star, Clock, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Chatbot from "../AIChatbot/Chatbot";

const HERO_IMAGES = [
  { url: "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg",  place: "Rajasthan",       tagline: "The Land of Kings" },
  { url: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg",  place: "Kerala",          tagline: "God's Own Country" },
  { url: "https://images.pexels.com/photos/14131701/pexels-photo-14131701.jpeg", place: "Lush Valleys",   tagline: "Nature Untouched" },
  { url: "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg",  place: "Golden Temples",  tagline: "Spiritual India" },
  { url: "https://images.pexels.com/photos/28408505/pexels-photo-28408505.jpeg", place: "Himachal Pradesh","tagline": "Mountains & Beyond" },
];

const WHY_ITEMS = [
  { icon: <Hotel size={22} strokeWidth={1.5} />, label: "Premium Hotels",       desc: "Carefully vetted accommodations at every price point" },
  { icon: <Bus size={22} strokeWidth={1.5} />,   label: "Hassle-Free Transport", desc: "Airport pickups, intercity travel — all arranged" },
  { icon: <CalendarCheck size={22} strokeWidth={1.5} />, label: "Flexible Planning", desc: "Custom itineraries that fit your schedule and budget" },
];

const Home = () => {
  const isLoggedIn = sessionStorage.getItem("token");
  const navigate   = useNavigate();
  const [destinations, setDestination] = useState([]);
  const [packages,     setPackages]    = useState([]);
  const [current,      setCurrent]     = useState(0);
  const timerRef = useRef(null);

  useEffect(() => { loadDestination(); }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setCurrent(i);
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % HERO_IMAGES.length), 5000);
  };

  const loadDestination = async () => {
    try {
      let d = await axios.get(Api.FETCH_DESTINATIONS);
      setDestination(d.data.destinations.slice(0, 3));
      let p = await axios.get(Api.FETCH_PACKAGES);
      setPackages(p.data.slice(0, 3));
    } catch(e) { console.log(e); }
  };

  return (
    <>
      <Navbar />

      {/* ════════════════ HERO ════════════════ */}
      <section className="hero">
        {HERO_IMAGES.map((img, i) => (
          <div key={i} className={`hero__slide ${i === current ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${img.url})` }} />
        ))}

        {/* overlay */}
        <div className="hero__overlay" />

        {/* content */}
        <div className="hero__body ">
          <h1 className="hero__title">
            Explore <br />
            <em>India's</em> Most<br />
            Beautiful Places
          </h1>
          <p className="hero__sub">
            From golden deserts to misty mountains — plan, book, and travel effortlessly.
          </p>
          <div className="hero__actions">
            <button className="hero__btn-primary" onClick={() => navigate('/destinations')}>
              View Destinations <ChevronRight size={16} />
            </button>
            <button className="hero__btn-ghost" onClick={() => navigate('/packages')}>
              Browse Packages
            </button>
          </div>

          {/* current slide label */}
          {/* <div className="hero__slide-label">
            <MapPin size={13} />
            <span>{HERO_IMAGES[current].place}</span>
            <span className="hero__slide-tagline">— {HERO_IMAGES[current].tagline}</span>
          </div> */}

          {/* dots */}
          <div className="hero__dots">
            {HERO_IMAGES.map((_, i) => (
              <button key={i} className={`hero__dot ${i === current ? "is-active" : ""}`}
                onClick={() => goTo(i)} aria-label={`Slide ${i+1}`} />
            ))}
          </div>
        </div>

        {/* stat pills — bottom right */}
        <div className="hero__stats">
          <div className="hero__stat"><span className="hero__stat-num">24</span><span className="hero__stat-lbl">Packages</span></div>
          <div className="hero__stat-sep" />
          <div className="hero__stat"><span className="hero__stat-num">6</span><span className="hero__stat-lbl">Destinations</span></div>
          <div className="hero__stat-sep" />
          <div className="hero__stat"><span className="hero__stat-num">4.8★</span><span className="hero__stat-lbl">Rating</span></div>
          <div className="hero__stat-sep" />
          <div className="hero__stat"><span className="hero__stat-num">500+</span><span className="hero__stat-lbl">Travelers</span></div>
        </div>

        {/* counter */}
        <div className="hero__counter">
          <span>{String(current+1).padStart(2,"0")}</span> / <span>{String(HERO_IMAGES.length).padStart(2,"0")}</span>
        </div>
      </section>

      {/* ════════════════ DESTINATIONS ════════════════ */}
      <section className="dest-section">
        <div className="dest-section__head">
          <div>
            <p className="section-label">Explore India</p>
            <h2 className="section-title">Popular Destinations</h2>
          </div>
          <button className="btn-see-all" onClick={() => navigate("/destinations")}>
            See All <ChevronRight size={15} />
          </button>
        </div>

        <div className="dest-grid">
          {destinations?.map((item, i) => (
            <div className="dest-card" key={i} onClick={() => navigate(`/destination/${item.id}`)}>
              <div className="dest-card__img-wrap">
                <img src={item.imageURL} alt={item.place} />
                <div className="dest-card__badge"><Star size={11} fill="#f9b44a" strokeWidth={0} /> 4.8</div>
              </div>
              <div className="dest-card__body">
                <div>
                  <h4 className="dest-card__name">{item.place}</h4>
                  <p className="dest-card__loc"><MapPin size={12} /> India</p>
                </div>
                <button className="dest-card__btn" onClick={(e) => { e.stopPropagation(); navigate(`/destination/${item.id}`); }}>
                  Explore <MoveRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Chatbot />

      {/* ════════════════ WHY SECTION ════════════════ */}
      <section className="why">
        <div className="why__inner">
          <div className="why__left">
            <p className="section-label" style={{color:"#f9b44a"}}>Why Destinova</p>
            <h2 className="why__title">Everything taken care of — so you simply explore</h2>
            <p className="why__sub">From the moment you book to the second you return, every detail is handled with care.</p>
            <button className="why__cta" onClick={() => navigate('/destinations')}>
              Start Exploring <ChevronRight size={15} />
            </button>
          </div>
          <div className="why__cards">
            {WHY_ITEMS.map((f, i) => (
              <div className="why__card" key={i}>
                <div className="why__card-icon">{f.icon}</div>
                <div>
                  <h4>{f.label}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ PACKAGES ════════════════ */}
      <section className="pkg-section">
        <div className="pkg-section__head">
          <div>
            <p className="section-label">Handpicked for you</p>
            <h2 className="section-title">Top Travel Packages</h2>
          </div>
        </div>

        <div className="pkg-grid">
          {packages?.map((item) => (
            <div className="pkg-card" key={item.id}>
              <div className="pkg-card__header">
                <span className="pkg-card__tag"><Sparkles size={11} /> Featured</span>
                <span className="pkg-card__rating"><Star size={12} fill="#f9b44a" strokeWidth={0} /> 4.8</span>
              </div>

              <div className="pkg-card__body">
                <h4 className="pkg-card__title">{item.title}</h4>
                <p className="pkg-card__desc">{item.description}</p>

                <div className="pkg-card__meta">
                  <div className="pkg-meta-pill"><Clock size={12} /> {item.days_night.split(" ")[0]} Days</div>
                  <div className="pkg-meta-pill"><Hotel size={12} /> ₹{item.hotel_price}/Night</div>
                  <div className="pkg-meta-pill"><Bus size={12} /> ₹{item.transport_cost}</div>
                </div>
              </div>

              <div className="pkg-card__footer">
                <div className="pkg-card__price">
                  <span className="pkg-card__price-lbl">From</span>
                  <div className="pkg-card__price-row">
                    <strong>₹{item.base_price}</strong>
                    <small>/person</small>
                  </div>
                </div>
                {!isLoggedIn ? (
                  <button className="pkg-btn pkg-btn--view" onClick={() => navigate("/users/sign-in")}>
                    View Package
                  </button>
                ) : (
                  <button className="pkg-btn pkg-btn--book" onClick={() => navigate(`/destination/${item.destinationId}/${item.id}`)}>
                    Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;