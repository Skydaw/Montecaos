import React, { useEffect, useState } from 'react'
import axios from 'axios';
import{Link } from'react-router-dom'





const ListArticle = () => {
    const [blog,setBlog] = useState([]);
  const url ='http://localhost:5000/api/blog'
    async function getPosts() {
      try {
        const res = await axios.get(url);
        setBlog(res.data);
  
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(()=>{
      getPosts()    
    },[])


    
    return(
        <div className='all-article'>    
        {blog.map((p) => {
            const { _id, titleurl, title, body, date, img} = p;
            const imgName= img.substr(37)
            async function del() {
                const imgUrl =`${url}/image/${imgName}`;
                 const blogurl=`${url}/${titleurl}`;
                try {
                    const ris =await axios.delete(imgUrl);
                    const res =await axios.delete(blogurl);
                    console.log(ris)
                    console.log(res)
                    window.location.href = 'http://localhost:3000/actualite'
                    
        
                } catch (error) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            }
            function verif(){
                const clss =`.delmethod${titleurl}`
                const objet = document.querySelectorAll(clss)
                objet.forEach(function(removeClass){
                    removeClass.classList.remove('hide')
                })
            }
            function hide(){
                const clss =`.delmethod${titleurl}`
                const objet = document.querySelectorAll(clss)
                objet.forEach(function(removeClass){
                    removeClass.classList.add('hide')
                })
            }


            return (
                <>
                <div className="article" key={_id}  >
                    <div className='corps'>
                        <div className='img-date'>
                            <div className="date-article">{date}</div>
                            <img className="img"  alt='Ilustration article Blog' src={img}></img>
                        </div>
                        <div>
                            <h2 className="title-article" >{title}</h2>
                            <div className="content-article">{body.substring(0,150)}...</div>

                        </div>

                    </div>

                   
                </div>
                    <Link to={`actualite/modifier/${titleurl}`}>Modifier</Link>
                    <button onClick={verif}>Suprimmer l'article</button>
                    <p  className={`delmethod${titleurl} hide`}>Êtes-vous sûrs ?</p>
                    <button  className={`delmethod${titleurl} hide`} onClick={del}>Oui</button>
                    <button  className={`delmethod${titleurl} hide`} onClick={hide}>Non</button> 

                    
                </>
        )
        })}
        </div>
    )    
}   


export default ListArticle
