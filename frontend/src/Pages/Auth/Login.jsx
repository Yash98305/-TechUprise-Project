import React, { useEffect, useState } from "react";
import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Context/auth";
import img from "../../Assets/3d-rendering-cartoon-like-boy.png";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth, api } = useAuth();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.warn("Please fill in all fields");

    try {
      const res = await axios.post(`${api}/auth/login`, { email, password });
      if (res?.data?.token) {
        setAuth({ ...auth, userId: res.data.userId, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify({ userId: res.data.userId, token: res.data.token }));
        toast.success("Login successful");
        navigate("/home");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      toast.info("You are already logged in");
      navigate("/home");
    }
  }, [auth, navigate, location]);

  return (
    <div className="flex flex-col lg:flex-row  items-center ">
      <ToastContainer position="top-right" autoClose={3000} />

     
      <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center">
        <img src={img} alt="Login" className="w-3/5 h-auto" />
      </div>

<div className="w-full lg:w-1/2 p-6 sm:p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Login Yourself</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full p-3 mb-4 border rounded outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="email"
            required
          />

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
            Submit
          </button>

          <p className="mt-6 text-right text-sm text-gray-700">
            Don't have an account?{" "}
            <NavLink to="/register" className="text-blue-600 hover:underline">
              Sign up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
