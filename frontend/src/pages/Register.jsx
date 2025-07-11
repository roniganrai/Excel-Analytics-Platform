import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/b.gif";
import Navbar from "../components/NavbarAuth";
import Footer from "../components/Footer";

export default function Register() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://excel-analytics-platform-430f.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.msg || "Registration failed.");
        return;
      }

      localStorage.setItem("token", result.token);
      alert("🎉 Registered Successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col text-white relative font-detective"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />
      <Navbar />

      <div className="z-10 flex-grow flex items-center justify-center px-4 py-16">
        <div className="bg-black/50 border border-cyan-400 p-10 rounded-xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl text-cyan-300 font-bold mb-6 text-center">
            🔏 Register New Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              value={userDetails.name}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={userDetails.email}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              name="password"
              type="password"
              placeholder="Choose a password"
              value={userDetails.password}
              onChange={handleChange}
              required
              className="input-field"
            />
            <button type="submit" className="detective-btn w-full">
              🚀 Create Account
            </button>
          </form>

          <p className="text-cyan-300 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline hover:text-cyan-100">
              Login here
            </Link>
          </p>
        </div>
      </div>

      <Footer />

      <style>{`
        .input-field {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #84cc16;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          outline: none;
          color: white;
        }
        .input-field::placeholder {
          color: #d9f99d;
        }
        .input-field:focus {
          border-color: #a3e635;
          box-shadow: 0 0 10px #bef264;
        }
        .detective-btn {
          background: linear-gradient(135deg, #65a30d, #365314);
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-weight: bold;
          box-shadow: 0 0 20px rgba(132, 204, 22, 0.6);
          transition: all 0.3s ease-in-out;
        }
        .detective-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 25px rgba(190, 242, 100, 0.9);
        }
        .font-detective {
          font-family: 'Courier New', Courier, monospace;
        }
      `}</style>
    </div>
  );
}
