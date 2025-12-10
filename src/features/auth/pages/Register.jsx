// src/features/auth/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password, formData.photo);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" className="input input-bordered w-full mb-3"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input type="email" placeholder="Email" className="input input-bordered w-full mb-3"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <input type="password" placeholder="Password" className="input input-bordered w-full mb-3"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <input type="file" accept="image/*" className="file-input file-input-bordered w-full mb-4"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })} />

            <button type="submit" className={`btn btn-success w-full ${loading ? "loading" : ""}`}>
              Register
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="link link-primary">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;