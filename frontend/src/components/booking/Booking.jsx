import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import Api from "../../Api";
import './booking.css';


import {
  MapPin, Calendar, Users, CreditCard, Clock,
  CheckCircle, XCircle, AlertCircle, Download,
  X, Plane, Shield, Package
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StatusBadge = ({ status }) => {
  const map = {
    confirmed: { icon: <CheckCircle size={13} />, label: "Confirmed", cls: "badge--confirmed" },
    cancelled:  { icon: <XCircle size={13} />,    label: "Cancelled",  cls: "badge--cancelled"  },
    pending:    { icon: <AlertCircle size={13} />, label: "Pending",    cls: "badge--pending"    },
  };
  const s = map[status] || map.pending;
  return <span className={`bk-badge ${s.cls}`}>{s.icon} {s.label}</span>;
};

const Bookings = () => {
  const [bookings, setBookings]       = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);

  useEffect(() => { loadBookings(); }, []);

  const loadBookings = async () => {
    const token = sessionStorage.getItem("token");
    try {
      let res = await axios.get("http://localhost:3000/booking/my", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (e) { console.log(e); }
  };

  const handleStatus = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.put(`${Api.FETCH_BOOKING}/${id}`, { status: "confirmed" },
        { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Booking Confirmed ✅");
      loadBookings();
    } catch (e) { toast.error("Status Update Failed ❌"); }
  };

  const cancelBooking = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.put(`${Api.FETCH_BOOKING}/${id}`, { status: "cancelled" },
        { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Booking Cancelled");
      loadBookings();
    } catch (e) { toast.error("Cancel failed"); }
  };

  const handleRazorPayment = async (amount, bookingId) => {
    try {
      const { data } = await axios.post("http://localhost:3000/payment", { amount });
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount, currency: data.currency, order_id: data.id,
        name: "Destinova", description: "Travel Booking Payment",
        handler: async (response) => {
          await handleStatus(bookingId);
          const b = bookings.find(b => b.id === bookingId);
          setInvoiceData({ ...b, paymentId: response.razorpay_payment_id });
          setShowInvoice(true);
          toast.success("Payment Successful ✅");
        },
        prefill: { name: "Traveler", email: "traveler@email.com", contact: "9999999999" },
        theme: { color: "#ff7a45" },
      };
      const rp = new window.Razorpay(options);
      rp.on("payment.failed", r => toast.error(r?.error?.description || "Payment Failed"));
      rp.open();
    } catch (e) { toast.error("Something went wrong ❌"); }
  };

  const stats = {
    total:     bookings.length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    pending:   bookings.filter(b => b.status === "pending").length,
    spent:     bookings.filter(b => b.status === "confirmed").reduce((s, b) => s + (b.totalAmount || 0), 0),
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className="bk-hero">
        <div className="bk-hero__overlay" />
        <div className="bk-hero__body">
          <span className="bk-hero__pill"><Plane size={12} /> My Travel</span>
          <h1 className="bk-hero__title">My Bookings</h1>
          <p className="bk-hero__sub">Track, manage and pay for all your travel bookings in one place.</p>
        </div>
      </div>

      <div className="bk-page">

        {/* STAT CARDS */}
        <div className="bk-stats">
          <div className="bk-stat">
            <div className="bk-stat__icon bk-stat__icon--blue"><Package size={20} /></div>
            <div><p>Total Bookings</p><strong>{stats.total}</strong></div>
          </div>
          <div className="bk-stat">
            <div className="bk-stat__icon bk-stat__icon--green"><CheckCircle size={20} /></div>
            <div><p>Confirmed</p><strong>{stats.confirmed}</strong></div>
          </div>
          <div className="bk-stat">
            <div className="bk-stat__icon bk-stat__icon--amber"><AlertCircle size={20} /></div>
            <div><p>Pending</p><strong>{stats.pending}</strong></div>
          </div>
          <div className="bk-stat">
            <div className="bk-stat__icon bk-stat__icon--orange"><CreditCard size={20} /></div>
            <div><p>Total Spent</p><strong>₹{stats.spent.toLocaleString()}</strong></div>
          </div>
        </div>

        {/* BOOKINGS */}
        {bookings.length === 0 ? (
          <div className="bk-empty">
            <div className="bk-empty__icon">🗺️</div>
            <h3>No bookings yet</h3>
            <p>Start your journey by exploring our destinations.</p>
            <button onClick={() => navigate("/destinations")}>Explore Destinations →</button>
          </div>
        ) : (
          <div className="bk-list">
            {bookings.map((b) => (
              <div className="bk-card" key={b.id}>
                <div className="bk-card__left">
                  <div className="bk-card__icon"><MapPin size={22} /></div>
                </div>
                <div className="bk-card__body">
                  <div className="bk-card__top">
                    <div>
                      <h4 className="bk-card__title">{b.package?.title}</h4>
                      <p className="bk-card__desc">{b.package?.description}</p>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                  <div className="bk-card__meta">
                    <span><Users size={13} /> {b.persons} Traveler{b.persons > 1 ? "s" : ""}</span>
                    <span><Clock size={13} /> {b.duration} Days</span>
                    {b.travelDate && (
                      <span><Calendar size={13} /> {new Date(b.travelDate).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</span>
                    )}
                    <span className="bk-card__price">₹{b.totalAmount?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bk-card__actions">
                  {b.status === "pending" && (
                    <button className="bk-btn bk-btn--pay" onClick={() => handleRazorPayment(b.totalAmount, b.id)}>
                      <CreditCard size={14} /> Pay Now
                    </button>
                  )}
                  {b.status === "confirmed" && (
                    <button className="bk-btn bk-btn--invoice" onClick={() => { setInvoiceData(b); setShowInvoice(true); }}>
                      <Download size={14} /> Invoice
                    </button>
                  )}
                  {b.status === "cancelled" ? (
                    <button className="bk-btn bk-btn--cancelled" disabled><XCircle size={14} /> Cancelled</button>
                  ) : (
                    <button className="bk-btn bk-btn--cancel" onClick={() => cancelBooking(b.id)}>Cancel</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INVOICE MODAL */}
      {showInvoice && invoiceData && (
        <div className="inv-modal" onClick={() => setShowInvoice(false)}>
          <div className="inv-box" onClick={e => e.stopPropagation()}>
            <button className="inv-close" onClick={() => setShowInvoice(false)}><X size={18} /></button>
            <div className="inv-header">
              <div className="inv-logo"><Plane size={18} /></div>
              <h2>Destinova</h2>
              <p>Official Travel Invoice</p>
            </div>
            <div className="inv-body">
              {[
                ["Booking ID",  `#${invoiceData.id}`],
                ["Package",     invoiceData.package?.title],
                ["Travelers",   invoiceData.persons],
                ["Travel Date", invoiceData.travelDate || "—"],
                ["Total Paid",  `₹${invoiceData.totalAmount?.toLocaleString()}`],
                ["Payment ID",  invoiceData.paymentId || "—"],
                ["Status",      "Paid ✅"],
              ].map(([k, v]) => (
                <div className="inv-row" key={k}><span>{k}</span><strong>{v}</strong></div>
              ))}
            </div>
            <div className="inv-footer">
              <button className="inv-btn inv-btn--print" onClick={() => window.print()}><Download size={15} /> Download Invoice</button>
              <button className="inv-btn inv-btn--close" onClick={() => setShowInvoice(false)}>Close</button>
            </div>
            <div className="inv-secure"><Shield size={12} /> Secure • Verified Payment</div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Bookings;