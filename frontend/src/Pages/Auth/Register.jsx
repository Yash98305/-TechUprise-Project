import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useAuth } from "../../Context/auth";
import img from "../../Assets/3d-cartoon-style-character.png";

const Register = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const { api, auth, setAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !phone || !password) {
      return toast.warn("Please fill all required fields");
    }
    if (!/^\d{10}$/.test(phone)) {
      return toast.error("Phone number must be 10 digits");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      const res = await axios.post(`${api}/auth/register`, {
        name,
        email,
        phone,
        password,
      });

      if (res?.data?.success) {
        toast.success("Registered successfully");
        setAuth({ ...auth, userId: res.data.userId, token: res.data.token });

        localStorage.setItem(
          "auth",
          JSON.stringify({ userId: res.data.userId, token: res.data.token })
        );
        navigate("/home");
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      toast.info("You are already logged in");
      navigate("/home");
    }
  }, [auth, navigate]);

  return (
    <div className="flex flex-col lg:flex-row items-center ">


      <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center">
        <img src={img} alt="Register" className="w-3/5 h-auto" />
      </div>


      <div className="w-full lg:w-1/2 p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Register Yourself</h1>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="w-full p-3 mb-4 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            autoComplete="email"
            className="w-full p-3 mb-4 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            className="w-full p-3 mb-4 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Password field with visibility toggle */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full p-3 pr-12 border rounded outline-none focus:ring-2 focus:ring-blue-400"
              required
              autoComplete="new-password"
            />
            <div className="absolute inset-y-0 right-2 flex items-center pr-2">
              <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-all"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
