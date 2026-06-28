// import React, { useRef, useState } from "react";
// import { Link, useNavigate, useNavigationType } from "react-router-dom";
// import Navbar from "../navbar/Navbar";
// import "./signin.css";
// import Footer from '../footer/Footer'
// import axios from "axios";
// import Api from "../../Api";
// import { toast } from "react-toastify";

// const SignIn = () => {
//   const navigate = useNavigate()
//   const emailInput = useRef()
//   const passwordInput = useRef()

//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       let email = emailInput.current.value;
//         let password = passwordInput.current.value;
//        let response = await axios.post(Api.FETCH_USER_SIGN_IN+"/sign-in",{email,password});
//         console.log(response.data);
//         toast.success(`Welcome back ${response.data.user.email} ✈️`, {
//   position: "top-right",
// });
//         sessionStorage.setItem("token",response.data.token);
//         sessionStorage.setItem("currentUserId",""+response.data.user.id);
//         sessionStorage.setItem("currentUserEmail",response.data.user.email);
//         setTimeout(() => {
//       if(response.data.user.role ==="admin"){
//         navigate("/admin")
//       }else{
//         navigate("/")
//       }
//     }, 1500);

//     } catch (error) {
//       console.log(error);
//          toast.error("Sign in failed..");
//     }
  
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="signin-container">
//         {/* Left Hero Section */}
//         <div className="hero-section ">
//           <div className="hero-content">
//             <div className="destinova-logo">Destinova</div>
//             <h1>Your next adventure</h1>
//             <p className="hero-text">
//               Thousands of happy travelers planning their journeys
//             </p>
//           </div>
//         </div>

//         {/* Right SignIn Form */}
//         <div className="form-section">
//           <div className="form-card">
//             <div className="form-header">
//               <Link to="/users/sign-up" className="create-account">Sign In</Link>
//             </div>

//             <form onSubmit={handleSubmit} className="signin-form">
//               <div className="mb-4">
//                 <label className="form-label fw-semibold">Email</label>
//                 <input ref={emailInput}
//                   type="email"
//                   className="form-control glass-input"
//                   placeholder="you@example.com"
                  
              
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="form-label fw-semibold">Password</label>
//                 <input 
//                   ref={passwordInput}
//                   type="password"
//                   className="form-control glass-input"
//                   placeholder="••••••••"
                  
//                   required
//                 />
//               </div>

//               <div className="d-flex justify-content-end mb-4">
//                 <Link to="/forgot-password" className="forgot-link">
//                   Forgot Password?
//                 </Link>
//               </div>

//               <button type="submit" className="btn btn-primary w-100 signin-btn">
//                 Sign In
//               </button>
//             </form>

//             <div className="admin-login">
//               <span>Admin: admin@destinova.com</span>
//             </div>
//           </div>
//         </div>
//       </div>
    
//     </>
//   );
// };

// export default SignIn;



import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../navbar/Navbar";
import "./signin.css";
import axios from "axios";
import Api from "../../Api";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock, Plane } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const emailInput = useRef();
  const passwordInput = useRef();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      let email = emailInput.current.value;
      let password = passwordInput.current.value;
      let response = await axios.post(Api.FETCH_USER_SIGN_IN + "/sign-in", { email, password });
      toast.success(`Welcome back ${response.data.user.email} `, { position: "top-right" });
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("currentUserId", "" + response.data.user.id);
      sessionStorage.setItem("currentUserEmail", response.data.user.email);
      setTimeout(() => {
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Sign in failed..");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signin-page mt-3">

        {/* ── LEFT PANEL ── */}
        <div className="signin-left">
          <div className="signin-left-inner">
            <div className="sl-logo">
              <div className="sl-logo-icon"><Plane size={20} /></div>
              <span>Destino<b>va</b></span>
            </div>
            <h1 className="sl-heading">
              Your next<br />
              <span className="sl-accent">adventure</span><br />
              awaits.
            </h1>
            <p className="sl-sub">
              Thousands of happy travelers planning unforgettable journeys across incredible India.
            </p>
            <div className="sl-stats">
              <div className="sl-stat"><div className="sl-stat-num">500+</div><div className="sl-stat-lbl">Travelers</div></div>
              <div className="sl-stat-divider" />
              <div className="sl-stat"><div className="sl-stat-num">24</div><div className="sl-stat-lbl">Packages</div></div>
              <div className="sl-stat-divider" />
              <div className="sl-stat"><div className="sl-stat-num">4.8★</div><div className="sl-stat-lbl">Rating</div></div>
            </div>
            <div className="sl-avatars">
              <div className="sl-avatar" style={{background:"#f9b44a"}}>R</div>
              <div className="sl-avatar" style={{background:"#4ab8f9"}}>A</div>
              <div className="sl-avatar" style={{background:"#7c6cfa"}}>M</div>
              <div className="sl-avatar" style={{background:"#4af98a"}}>S</div>
              <div className="sl-avatar-count">+496</div>
            </div>
          </div>
          <div className="sl-bg-circle sl-c1" />
          <div className="sl-bg-circle sl-c2" />
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="signin-right">
          <div className="signin-card">

            <div className="sc-header">
              <h2>Welcome back</h2>
              <p>Sign in to continue your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="sc-form">

              <div className="sc-field">
                <label>Email address</label>
                <div className="sc-input-wrap">
                  <Mail size={16} className="sc-input-icon" />
                  <input
                    ref={emailInput}
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="sc-field">
                <div className="sc-field-row">
                  <label>Password</label>
                  <Link to="/forgot-password" className="sc-forgot">Forgot password?</Link>
                </div>
                <div className="sc-input-wrap">
                  <Lock size={16} className="sc-input-icon" />
                  <input
                    ref={passwordInput}
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="sc-eye"
                    onClick={() => setShowPass(!showPass)}
                    aria-label="Toggle password"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="sc-submit" disabled={loading}>
                {loading ? (
                  <span className="sc-spinner" />
                ) : (
                  "Sign In →"
                )}
              </button>

            </form>

            <div className="sc-divider"><span>or</span></div>

            <div className="sc-footer">
              <p>Don't have an account? <Link to="/users/sign-up">Create one →</Link></p>
              <div className="sc-admin-hint">
                <span>Admin:</span> admin@destinova.com
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default SignIn;