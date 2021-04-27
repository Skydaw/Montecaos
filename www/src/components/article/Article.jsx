import React, { useState, useEffect } from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import axios from 'axios'



const url = "http://localhost:5000/api/blog"



const Article = () => {
    const[single,setSingle]=useState({});

    
    const match = useRouteMatch();
    
    
    
    const getSingle = async () =>{  
        const res = await axios.get(`${url}/${match.params.titleurl}`);
        
    
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
        <Link to='/actualite'>←retour</Link>
        <div className="article-alone">
            <img className="img" alt='Ilustration article Blog' src={single.img}></img>
            <h2 className="title-single">{single.title}</h2>
            <p className="date-single">{single.date}</p>

            <pre className="content-single">{single.body}</pre>
        </div>
        </>
    )
}
export default Article
