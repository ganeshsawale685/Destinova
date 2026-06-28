import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./signup.css";
import axios from "axios";
import Api from "../../Api";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock, User, Plane } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      let name = nameInput.current.value;
      let email = emailInput.current.value;
      let password = passwordInput.current.value;
      let response = await axios.post(Api.FETCH_USER_SIGN_IN + "/sign-up", { name, email, password });
      console.log(response.data);
      toast.success("Account created! Please sign in ✈️");
      navigate("/users/sign-in");
    } catch (error) {
      console.log(error);
      toast.error("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-page">

        {/* ── LEFT PANEL ── */}
        <div className="signup-left">
          <div className="signup-left-inner">
            <div className="sl-logo">
              <div className="sl-logo-icon"><Plane size={20} /></div>
              <span>Destino<b>va</b></span>
            </div>
            <h1 className="sl-heading">
              Start your<br />
              <span className="sl-accent">journey</span><br />
              today.
            </h1>
            <p className="sl-sub">
              Join thousands of travelers discovering India's most breathtaking destinations.
            </p>

            {/* Feature list */}
            <ul className="sl-features">
              {[
                { icon: "🗺️", text: "Access 24+ curated travel packages" },
                { icon: "🏨", text: "Premium hotels at every price point" },
                { icon: "📅", text: "Flexible itineraries, your schedule" },
                { icon: "⭐", text: "4.8 rated by 500+ happy travelers" },
              ].map((f, i) => (
                <li key={i}>
                  <span className="sl-feature-icon">{f.icon}</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="sl-bg-circle sl-c1" />
          <div className="sl-bg-circle sl-c2" />
          <div className="sl-bg-circle sl-c3" />
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="signup-right">
          <div className="signup-card">

            <div className="sc-header">
              <h2>Create account</h2>
              <p>It's free and takes less than a minute</p>
            </div>

            <form onSubmit={handleSubmit} className="sc-form">

              <div className="sc-field">
                <label>Full Name</label>
                <div className="sc-input-wrap">
                  <User size={15} className="sc-input-icon" />
                  <input
                    ref={nameInput}
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="sc-field">
                <label>Email address</label>
                <div className="sc-input-wrap">
                  <Mail size={15} className="sc-input-icon" />
                  <input
                    ref={emailInput}
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="sc-field">
                <label>Password</label>
                <div className="sc-input-wrap">
                  <Lock size={15} className="sc-input-icon" />
                  <input
                    ref={passwordInput}
                    type={showPass ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    className="sc-eye"
                    onClick={() => setShowPass(!showPass)}
                    aria-label="Toggle password"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="sc-submit" disabled={loading}>
                {loading ? <span className="sc-spinner" /> : "Create Account →"}
              </button>

            </form>

            <div className="sc-divider"><span>or</span></div>

            <div className="sc-footer">
              <p>Already have an account? <Link to="/users/sign-in">Sign in →</Link></p>
              <p className="sc-terms">
                By signing up you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default SignUp;