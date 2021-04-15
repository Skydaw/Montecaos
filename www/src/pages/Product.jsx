import React, { useState, useEffect } from 'react'
import {useRouteMatch} from 'react-router-dom'
import axios from 'axios'



const url = "http://localhost:5000/api/shop"



const Product = () => {
    const[single,setSingle]=useState({});

    
    const match = useRouteMatch();
    
    
    
    const getSingle = async () =>{  
        const res = await axios.get(`${url}/${match.params.producturl}`);
        
    
        setSingle(res.data);

        
        try {
        } catch (error) {
            console.error(error);

        }

    }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getSingle()},[]
    )
    return (
        <>
        <div className="article">
            <h2 className="title-single">{single.name}</h2>
            <img className="img" alt='Ilustration article Blog' src={single.img}></img>

            <pre className="content-single">{single.description}</pre>
            <p className="tags-single">{single.price}</p>
            <pre clclassName="content-single">{single.feature }</pre>
        </div>
        </>
    )
}
export default Product
