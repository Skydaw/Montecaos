import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import{Link } from'react-router-dom'
import { UserContext } from '../../js/UserContext';





const ListArticle = () => {
    const{user}=useContext(UserContext)
    const[userid,setUserdid]=useState('')
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
            const { _id, titleurl, title, body, createdAt, img} = p;
            
            const imgName= img.substr(37)
            let monthLt=''
            const monthNb = createdAt.substr(5,2)
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
         
            async function del() {
                const imgUrl =`${url}/image/${imgName}`;
                 const blogurl=`${url}/${titleurl}`;
                try {
                    const res =await axios({    
                        method:'delete',
                        url:blogurl, 
                        params:{userid}});;
                    const ris =await axios({    
                        method:'delete',
                        url:imgUrl, 
                        params:{userid}});
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
                setUserdid(user._id)
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
                            <div className="date-article">{createdAt.substr(8,2)} {monthLt} {createdAt.substr(0,4)}</div>
                            <img className="img"  alt='Ilustration article Blog' src={img}></img>
                        </div>
                        <div>
                            <h2 className="title-article" >{title}</h2>
                            <div className="content-article">{body.substring(0,150)}...</div>

                        </div>

                    </div>  

                   
                </div>
                <div className='admin-article'>

                <div>
                    <Link to={`actualite/modifier/${titleurl}`}>Modifier</Link>
                </div>
                <button onClick={verif}>Suprimmer l'article</button>
                <p  className={`delmethod${titleurl} hide`}>Êtes-vous sûrs ?</p>
                <button  className={`delmethod${titleurl} hide`} onClick={del}>Oui</button>
                <button  className={`delmethod${titleurl} hide`} onClick={hide}>Non</button> 
                </div>

                    
                </>
        )
        })}
        </div>
    )    
}   


export default ListArticle
