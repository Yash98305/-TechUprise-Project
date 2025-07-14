import * as React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/auth";
import { toast } from "react-toastify";
import img from "../Assets/DreamFusion_Logo.png"
const pages = ["Home", "About"];  
const settings = ["Profile", "Logout"];

const Header = ()=> {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
const {auth,api,setAuth} = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    e.preventDefault();
    let val = e.target.innerText.toLowerCase()
    if (val === "home") {
      navigate("/");
    }
    if (val === "about") {
      navigate("/about");
    }

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    e.preventDefault();
    let val = e.target.innerText.toLowerCase()
    if (val === "profile") {
      navigate("/profile");
    }
    if (val === "logout") {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast.success("Logout Successfully");
      navigate("/login")
    }
    setAnchorElUser(null);
  };

  useEffect(() => {
  }, [auth,api]);

  return (
    <>
    <AppBar position="static" sx={{ background:"none",marginTop:2,boxShadow:"none"}}>
      <Container maxWidth="xl" sx={{borderRadius:10,
       width:"96vw",boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",backgroundColor: "#e6e8e8"
  ,backdropFilter: "blur(20px) saturate(160%) contrast(45%) brightness(140%)",
  webkitBackdropFilter: "blur(20px) saturate(160%) contrast(45%) brightness(140%)"}}>
        <Toolbar disableGutters >
        
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              height : "50px",
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
             <img src={img} alt="LOGO" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {auth.token<=0 && !auth?.token ? (
            
            <>
            <Button
              onClick={()=>navigate("/login")}
              variant="outlined"
              style={{
                padding: "3px 10px",
                marginRight : 5,
                borderRadius: 5,
              }}
            >
             Login
            </Button>
            <Button
              onClick={()=>navigate("/register")}
              variant="outlined"
              style={{
                padding: "3px 10px",
                borderRadius: 5,
              }}
            >
             Register
            </Button>
           </>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="U" sx={{boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",background:"white"}} src = {`${api}/auth/photo/${auth?.userId}`} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
    <br />
    </>
  );
}
export default Header;
