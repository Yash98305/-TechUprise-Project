import img from "../../Assets/3d-cartoon-style-character.png";
import { TextField } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { IconButton, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../../Context/auth";

const Register = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");

  const { api, auth,setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${api}/auth/register`,
        {
          name,
          email,
          phone,
          password,
        }
      );
      if (res && res.data.success) {
        setAuth({
          ...auth,
          userId: res.data.userId,
          token: res.data.token,
        });
        toast.success("Registered successfully");
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

  useEffect(() => {
    if (auth?.token) {
      toast.success(`You are already logged in`);
      navigate("/home");
    }
  }, [navigate, auth, api]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <img src={img} style={{ marginLeft: 150, width: "70%", height: "100%" }} alt="Login" />
      </div>
      <div style={{ width: "50%" }}>
        <form onSubmit={handleSubmit} style={{ width: "400px" }}>
          <h1 style={{ textAlign: "center", padding: "5px 40px" }}>Register Yourself</h1>
          <TextField
            id="outlined-name"
            label="Name"
            value={name}
            name="name"
            required
            onChange={(e) => {
              setname(e.target.value);
            }}
            multiline
            style={{ width: "100%", borderColor: "red", marginBottom: "30px" }}
          />
          <TextField
            id="outlined-email"
            label="Email"
            value={email}
            name="email"
            required
            onChange={(e) => {
              setemail(e.target.value);
            }}
            multiline
            style={{ width: "100%", borderColor: "red", marginBottom: "30px" }}
            autoComplete="email"
          />
          <TextField
            id="outlined-phone"
            label="Phone"
            value={phone}
            required
            name="phone"
            onChange={(e) => {
              setphone(e.target.value);
            }}
            multiline
            style={{ width: "100%", borderColor: "red", marginBottom: "30px" }}
          />
          <input
            type="text"
            name="username"
            value={email}
            autoComplete="username"
            style={{ display: "none" }}
            readOnly
          />
          <FormControl
            sx={{ m: 1, width: "400px", marginLeft: "-0.1px",marginTop:"0px", marginBottom: "40px"}}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              value={password}
              name="password"
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
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
              autoComplete="new-password"
            />
          </FormControl>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "17px",
              backgroundColor: "black",
              color: "white",
              fontSize: "15px",
              borderRadius: "7px",
            }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
