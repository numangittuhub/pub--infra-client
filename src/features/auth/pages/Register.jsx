// src/features/auth/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password, photo);
      toast.success("Account created!");
      navigate("/dashboard"); // এখানে নিয়ে যাবে
    } catch (err) {
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">Register</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mb-3"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full mb-3"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full mb-3"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="file-input file-input-bordered w-full mb-4"
            />

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-success w-full ${loading ? "loading" : ""}`}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;