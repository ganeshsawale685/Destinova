// import React, { useEffect, useState } from "react";
// import { Plane, Search, Menu, X } from "lucide-react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import "./nav.css";
// import axios from "axios";
// import Api from "../../Api";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const isLoggedIn = sessionStorage.getItem("token");

//   const [destinations, setDestination] = useState([]);
//   const [search, setSearch] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     loadDestination();
//   }, []);

//   const loadDestination = async () => {
//     try {
//       let res = await axios.get(Api.FETCH_DESTINATIONS);
//       setDestination(res.data.destinations);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();

//     const match = destinations.find((d) =>
//       d.place.toLowerCase().includes(search.toLowerCase())
//     );

//     if (match) {
//       if (isLoggedIn) {
//         navigate(`/destination/${match.id}`);
//         setSearch("");
//         setMenuOpen(false);
//       } else {
//         toast.error("Sign-in First");
//         setTimeout(() => navigate("/users/sign-in"), 1000);
//       }
//     } else {
//       toast.error("No destination found");
//     }
//   };

//   return (
//     <nav className="custom-navbar sticky-top">

//       {/* Logo */}
//       <Link to="/" className="navbar-brand-custom">
//         <Plane size={28} className="logo-icon" />
//         <span className="logo-text">Destinova</span>
//       </Link>

//       {/* Mobile Toggle */}
//       <button
//         className="mobile-menu-btn"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         {menuOpen ? <X size={28} /> : <Menu size={28} />}
//       </button>

//       {/* Nav Links */}
//       <div className={`nav-menu ${menuOpen ? "active" : ""}`}>

//         <ul className="nav-links">

//           <li>
//             <Link
//               className={`nav-link ${
//                 location.pathname === "/" ? "active" : ""
//               }`}
//               to="/"
//               onClick={() => setMenuOpen(false)}
//             >
//               Home
//             </Link>
//           </li>

//           <li>
//             <Link
//               className={`nav-link ${
//                 location.pathname === "/destinations" ? "active" : ""
//               }`}
//               to="/destinations"
//               onClick={() => setMenuOpen(false)}
//             >
//               Destinations
//             </Link>
//           </li>

//           {isLoggedIn && (
//             <li>
//               <Link
//                 className="nav-link"
//                 to="/booking"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Bookings
//               </Link>
//             </li>
//           )}
//         </ul>

//         {/* Search */}
//         <form className="search-box" onSubmit={handleSearch}>
//           <Search size={18} className="search-icon" />

//           <input
//             type="text"
//             placeholder="Search destinations..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </form>

//         {/* Auth Buttons */}
//         <div className="nav-buttons">
//           {!isLoggedIn ? (
//             <>
//               <Link
//                 className="nav-link"
//                 to="/users/sign-in"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Sign In
//               </Link>

//               <Link
//                 className="btn-custom primary-btn"
//                 to="/users/sign-up"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Get Started
//               </Link>
//             </>
//           ) : (
//             <button
//               className="btn-custom danger-btn"
//               onClick={() => {
//                 sessionStorage.clear();
//                 navigate("/");
//                 setMenuOpen(false);
//               }}
//             >
//               Logout
//             </button>
//           )}
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// ----------------------------------------------------------------

import React, { useEffect, useState, useRef } from "react";
import { Plane, Search, Menu, X, MapPin, ChevronDown } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./nav.css";
import axios from "axios";
import Api from "../../Api";
import { toast } from "react-toastify";

const Navbar = () => {
  const isLoggedIn = sessionStorage.getItem("token");

  const [destinations, setDestination] = useState([]);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    loadDestination();
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Scroll detection — only matters on home for transparent nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const loadDestination = async () => {
    try {
      let res = await axios.get(Api.FETCH_DESTINATIONS);
      setDestination(res.data.destinations);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (val.trim().length > 0) {
      const filtered = destinations.filter((d) =>
        d.place.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const match = destinations.find((d) =>
      d.place.toLowerCase().includes(search.toLowerCase())
    );
    if (match) {
      if (isLoggedIn) {
        navigate(`/destination/${match.id}`);
        setSearch("");
        setSuggestions([]);
        setSearchOpen(false);
        setMenuOpen(false);
      } else {
        toast.error("Sign-in First");
        setTimeout(() => navigate("/users/sign-in"), 1000);
      }
    } else {
      toast.error("No destination found");
    }
  };

  const pickSuggestion = (dest) => {
    if (isLoggedIn) {
      navigate(`/destination/${dest.id}`);
    } else {
      toast.error("Sign-in First");
      setTimeout(() => navigate("/users/sign-in"), 1000);
    }
    setSearch("");
    setSuggestions([]);
    setSearchOpen(false);
    setMenuOpen(false);
  };

  // Transparent on home before scroll, solid white otherwise
  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <nav className={`custom-navbar${transparent ? " nav-transparent" : " nav-solid"}`}>

      {/* ── LOGO ── */}
      <Link to="/" className="navbar-brand-custom">
        <div className="logo-icon-wrap">
          <Plane size={18} />
        </div>
        <span className="logo-text">Destino<span className="logo-accent">va</span></span>
      </Link>

      {/* ── DESKTOP LINKS ── */}
      <ul className="nav-links">
        <li>
          <Link className={`nav-link${location.pathname === "/" ? " active" : ""}`} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={`nav-link${location.pathname === "/destinations" ? " active" : ""}`} to="/destinations">
            Destinations
          </Link>
        </li>
        <li>
          
        </li>
        {isLoggedIn && (
          <li>
            <Link className={`nav-link${location.pathname === "/booking" ? " active" : ""}`} to="/booking">
              My Bookings
            </Link>
          </li>
        )}
      </ul>

      {/* ── DESKTOP RIGHT ACTIONS ── */}
      <div className="nav-actions">

        {/* Search */}
        <div className="search-wrap" ref={searchRef}>
          <button
            className="search-icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
          >
            <Search size={18} />
          </button>

          <div className={`search-dropdown${searchOpen ? " open" : ""}`}>
            <form className="search-form" onSubmit={handleSearch}>
              <Search size={16} className="sd-icon" />
              <input
                autoFocus
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={handleSearchChange}
              />
              {search && (
                <button
                  type="button"
                  className="sd-clear"
                  onClick={() => { setSearch(""); setSuggestions([]); }}
                >
                  <X size={14} />
                </button>
              )}
            </form>

            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((d) => (
                  <li key={d.id} onClick={() => pickSuggestion(d)}>
                    <MapPin size={13} />
                    <span>{d.place}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Auth */}
        {!isLoggedIn ? (
          <>
            <Link className="nav-signin" to="/users/sign-in">Sign In</Link>
            <Link className="nav-cta" to="/users/sign-up">Get Started</Link>
          </>
        ) : (
          <button
            className="nav-logout"
            onClick={() => { sessionStorage.clear(); navigate("/"); }}
          >
            Logout
          </button>
        )}
      </div>

      {/* ── MOBILE HAMBURGER ── */}
      <button
        className={`hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {/* ── MOBILE DRAWER ── */}
      <div className={`mobile-drawer${menuOpen ? " open" : ""}`}>

        {/* Mobile Search */}
        <form className="mobile-search" onSubmit={handleSearch}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={handleSearchChange}
          />
        </form>

        {suggestions.length > 0 && (
          <ul className="mobile-suggestions">
            {suggestions.map((d) => (
              <li key={d.id} onClick={() => pickSuggestion(d)}>
                <MapPin size={13} /> {d.place}
              </li>
            ))}
          </ul>
        )}

        <ul className="mobile-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/destinations">Destinations</Link></li>
          {/* <li><Link to="/packages">Packages</Link></li> */}
          {isLoggedIn && <li><Link to="/booking">My Bookings</Link></li>}
        </ul>

        <div className="mobile-auth">
          {!isLoggedIn ? (
            <>
              <Link className="mob-signin" to="/users/sign-in">Sign In</Link>
              <Link className="mob-cta" to="/users/sign-up">Get Started →</Link>
            </>
          ) : (
            <button
              className="mob-logout"
              onClick={() => { sessionStorage.clear(); navigate("/"); setMenuOpen(false); }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />}

    </nav>
  );
};

export default Navbar;