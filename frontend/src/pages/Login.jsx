import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import detectiveBg from "../assests/b.gif";
import Navbar from "../components/NavbarAuth";
import Footer from "../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://excel-analytics-platform-430f.onrender.com",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.msg || "Login failed");
        return;
      }

      localStorage.setItem("token", result.token);
      alert("✅ Logged in successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col text-white font-detective relative"
      style={{
        backgroundImage: `url(${detectiveBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />
      <Navbar />

      <div className="z-10 flex-grow flex items-center justify-center px-4 py-16">
        <div className="bg-black/50 border border-cyan-400 p-10 rounded-xl shadow-xl w-full max-w-md relative">
          <h2 className="text-3xl text-cyan-300 font-bold mb-6 text-center">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              className="input-field"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="detective-btn w-full">
              🔐 Sign In
            </button>
          </form>

          <p className="text-cyan-300 text-sm mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="underline hover:text-cyan-100">
              Create One
            </Link>
          </p>
        </div>
      </div>

      <Footer />

      <style>{`
        .input-field {
          background: rgba(255, 255, 255, 0.06);
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
          box-shadow: 0 0 12px #bef264;
        }
        .detective-btn {
          background: linear-gradient(135deg, #65a30d, #365314);
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-weight: bold;
          box-shadow: 0 0 18px rgba(132, 204, 22, 0.6);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .detective-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 24px rgba(190, 242, 100, 0.85);
        }
        .font-detective {
          font-family: 'Courier New', Courier, monospace;
        }
      `}</style>
    </div>
  );
}
