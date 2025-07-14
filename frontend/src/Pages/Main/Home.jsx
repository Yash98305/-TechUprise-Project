import React, { useState } from 'react'
import Search from '../../Components/Search'
import { useAuth } from '../../Context/auth';

const Home = () => {
  const {data,setFiltered} = useAuth();
  console.log(data)
  return (<>
    <div style={{
      display : "flex",
      justifyContent:"space-around",
      alignItems:"center",
      height:"490px"
      }}>
<div style={{
boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",backgroundColor: "#e6e8e8"
  ,backdropFilter: "blur(20px) saturate(160%) contrast(45%) brightness(140%)",
  webkitBackdropFilter: "blur(20px) saturate(160%) contrast(45%) brightness(140%)",  height:"100%",
  width:"20%"
}}></div>
<div style={{
boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",backgroundColor: "#e6e8e8"
  ,backdropFilter: "blur(20px) saturate(160%) contrast(45%) brightness(140%)",
  webkitBackdropFilter: "blur(20px) saturate(160%) contrast(45%) brightness(140%)",  height:"100%",
  width:"65%"
}}>

</div>
    </div>
    
<div style={{
  height:"60px",
  marginTop : "5px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 20px 0px 20px",
  zIndex: "999"
}}
>
  <Search/>
</div>
    </>
  )
}

export default Home