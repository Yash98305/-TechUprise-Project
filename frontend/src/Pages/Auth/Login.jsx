import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import img from "../../Assets/3d-rendering-cartoon-like-boy.png";
import { IconButton, OutlinedInput, TextField } from "@mui/material";
import { useAuth } from "../../Context/auth";

const Login = () => {
  const location = useLocation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { auth, setAuth, api } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/auth/login`, {
        email,
        password,
      });
      if (res) {
        setAuth({
          ...auth,
          userId: res.data.userId,
          token: res.data.token,
        });
        toast.success("Login successfully");
        localStorage.setItem(
          "auth",
          JSON.stringify({ userId: res.data.userId, token: res.data.token })
        );
        navigate("/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (auth?.token) {
      toast.success(`you already logged in`);
      navigate("/home");
    }
  }, [navigate, api, auth, location]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <img src={img} style={{ marginLeft: 150, width: "70%", height: "100%" }} alt="Login" />
      </div>
      <div style={{ width: "50%" }}>
        <form onSubmit={handleSubmit} style={{ width: "400px" }}>
          <h1 style={{ textAlign: "center", padding: "5px 40px" }}>Login Yourself</h1>

          <TextField
            id="outlined-multiline-flexible"
            label="Email"
            value={email}
            name="email"
            required
            onChange={(e) => {
              setemail(e.target.value);
            }}
            style={{
              width: "100%",
              borderColor: "red",
              marginBottom: "30px",
            }}
            autoComplete="email"
          />

          <FormControl
            sx={{ m: 1, width: "400px", marginLeft: "-0.1px",marginBottom:"40px",marginTop:"0px"}}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              value={password}
              name="password"
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              autoComplete="current-password"
            />
          </FormControl>

          <button
            style={{
              width: "100%",
              padding: "17px",
              backgroundColor: "black",
              color: "white",
              fontSize: "15px",
              borderRadius: "7px",
            }}
          >
            Submit
          </button>
          <p
            style={{
              marginTop: "30px",
              textAlign: "right",
              marginRight: "7px",
            }}
          >
            Don't have an account yet? <NavLink to="/register">Sign up</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
