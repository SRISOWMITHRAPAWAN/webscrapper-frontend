import React from "react";
import { Route,Routes,BrowseRouter,Link } from "react-router-dom";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useEffect,useState} from 'react';
import axios from 'axios';
import {useFormik} from "formik"
import Carousal from './carousal';


export default function Cards(){
    const[product,setProduct]=useState([]);
const formik = useFormik({
initialValues:{
title : ""
},
onSubmit : (values)=>{

    const arr = product.filter((x)=>x.title===values.title);
if(arr.length>0){
   setProduct(arr);
}
else{
    alert("enter correct product name");
}

//else if(item.name.toLowerCase().includes(search.toLoweCase()))
}
})

    
    // const[search,setSearch]=useState("");



    const getProductData = async ()=>{
      try{
          const data=await axios.get(
              "https://webscrapper-backend.onrender.com/scrapdata/get");
              console.log(data.data);
              setProduct(data.data);
      }
      catch(err){
          console.log(err)
          alert("something went wrong please reload");
      }
  }
  useEffect(()=>{
      getProductData();
  },[]);
return(
<div className="container">
<Carousal />
     <form className="d-flex mb-5" onSubmit={formik.handleSubmit} style={{marginTop:"2rem"}} >
      <input
      className="form-control mt-5"
      name="title"
      value={formik.values.title}
      onChange={formik.handleChange}
      type="text"
      placeholder="search here"
     
     
      />
      <button className="btn btn-outline-success mt-5">Search</button>
      
      </form>
      <div style={{border:"2px solid red",padding:"5px",borderRadius:"5px"}}>NOTE:ENTER THE CORRECT NAME
        PLEASE FOLLOW THE BELOW ORDER FOR SEARCH INCLUEDE BRACKETS<br></br>
        APPLE iPhone 14 plus (red, 128 GB)<br></br>
        APPLE iPhone 13 (blue, 128 GB)<br></br>
        APPLE iPhone 13 (white, 256 GB)
        

      </div><br></br>
   {product? <div className="products-wrapper">
    {product.map((item)=>{
        return(
            <Card sx={{ maxWidth: 345 }} >
      <CardMedia
        component="img"
        height="160"
        image={item.imgurl}
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.website}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {item.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {item.rating}
        </Typography>
      </CardContent>
      <CardActions>
     
      </CardActions>
    </Card>
        )
    })}
    </div>:<>loading.......</>}
</div>
)

}