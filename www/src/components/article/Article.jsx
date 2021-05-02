import React, { useState, useEffect } from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import axios from 'axios'



const url = "http://localhost:5000/api/blog"



const Article = () => {

    const[single,setSingle]=useState({});
    const[date,setDate]=useState('')

    
    const match = useRouteMatch();

    
    
    
    const getSingle = async () =>{  
        const res = await axios.get(`${url}/${match.params.titleurl}`);
        
    
        setSingle(res.data);
        setDate(res.data.createdAt)
        console.log(res.data)

        
        try {
        } catch (error) {
            console.error(error);

        }

    }
    document.title=`${single.title} - Montecaos `;

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getSingle()},[]
    )
    if(single){
        let monthLt=''
        const monthNb = date.substr(5,2)
        if(monthNb ==='01'){
             monthLt='janvier'
        }
        if(monthNb ==='02'){
             monthLt='fevrier'
        }
        if(monthNb ==='03'){
             monthLt='mars'
        }
        if(monthNb ==='04'){
             monthLt='avril'
        }
        if(monthNb ==='05'){
             monthLt='mai'
        }
        if(monthNb ==='06'){
             monthLt='juin'
        }
        if(monthNb ==='07'){
             monthLt='juillet'
        }
        if(monthNb ==='08'){
             monthLt='aout'
        }
        if(monthNb ==='09'){
             monthLt='septembre'
        }
        if(monthNb ==='10'){
             monthLt='octobre'
        }
        if(monthNb ==='11'){
             monthLt='nomvembre'
        }
        if(monthNb ==='12'){
             monthLt='decembre'
        }
 
        return (
            <>
        <Link to='/actualite'>←retour</Link>
        <div className="article-alone">
            <img className="img" alt='Ilustration article Blog' src={single.img}></img>
            <h2 className="title-single">{single.title}</h2>

            <pre className="content-single">{single.body}</pre>
            <p className="date-single">{date.substr(8,2)} {monthLt} {date.substr(0,4)} </p>
        </div>
        </>
    )
}
}
export default Article
