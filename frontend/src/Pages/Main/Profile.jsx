import React from 'react'
import {useAuth} from "../../Context/auth.jsx"
import {Avatar, Fab, FormControl, InputLabel, OutlinedInput, TextField} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const Profile = () => {
  const {api,auth} = useAuth();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [photo, setPhoto] = useState("");
  const [ebutton, setebutton] = useState(false);
  const getProfile = async () => {
    try {
      const res = await axios?.get(`${api}/auth/profile`);
      if(res){
      setname(res.data.user.name);
      setemail(res.data.user.email);
      setphone(res.data.user.phone);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (auth?.token) getProfile();
  }, [auth]);
  return (
    <div style={{padding:"0px 100px",minHeight:"84.8vh",display:"flex",}}>
    <div style={{width : "30%"}}> <Avatar
  alt="U"
  src={`${api}/auth/photo/${auth.userId}`}
  sx={{ width: "250px",padding:1,boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", height: "250px",backgroundColor : "white",borderRadius:"20px",marginTop:"40px"}}
/></div>
<div style={{width : "70%",display:"flex",justifyContent : "center"}}>
<form style={{ width: "80%" }}>
          <h1 style={{ textAlign: "center", padding: "5px 40px 0px 40px",marginBottom:0 }}>Your Profile</h1>
         <div style={{display:"flex",justifyContent:"end",marginBottom:30}}> <Fab variant="extended" onClick={()=>{setebutton(!ebutton)}} sx={{padding:"0 10",height:35}}>
  <EditIcon sx={{ mr: 1 ,scale:"0.8"}} />
  Edit
</Fab></div>
 {!ebutton ?  <><div style={{display:"flex",justifyContent:"space-between"}}>
         <TextField
            id="outlined-multiline-flexible"
            label="First Name"
            value={name.split(" ")[0]}          
            style={{
              width: "45%",
              borderColor: "red",
              marginBottom: "40px",
            }}
            InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Last Name"
            value={name.split(" ")[1]}
            style={{
              width: "45%",
              borderColor: "red",
              marginBottom: "40px",
            }}
            InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          />
          </div>
          <TextField
            id="outlined-multiline-flexible"
            label="Email"
            value={email}
            style={{
              width: "100%",
              borderColor: "red",
              marginBottom: "40px",
            }}
            InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Phone"
            value={phone}
            style={{
              width: "100%",
              borderColor: "red",
              marginBottom: "40px",
            }}
            InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          /></>
          :
    <><div style={{display:"flex",justifyContent:"space-between"}}> 
           <TextField
            id="outlined-multiline-flexible"
            label="First Name"
            value={name.split(" ")[0]}      
            onChange={(e)=>e.target.value = name.split(" ")}    
            style={{
              width: "45%",
              borderColor: "red",
              marginBottom: "40px",
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Last Name"
            value={name.split(" ")[1]}
            style={{
              width: "45%",
              borderColor: "red",
              marginBottom: "40px",
            }}
          />
          </div>
          <TextField
            id="outlined-multiline-flexible"
            label="Email"
            value={email}
            style={{
              width: "100%",
              borderColor: "red",
              marginBottom: "40px",
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Phone"
            value={phone}
            style={{
              width: "100%",
              borderColor: "red",
              marginBottom: "40px",
            }}
          />
         </>
          }

        </form>
</div> 
    </div>
  )
}

export default Profile