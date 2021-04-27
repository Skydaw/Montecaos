import React, { useState, useEffect } from 'react'
import { useRouteMatch} from 'react-router-dom'
import axios from 'axios'



const url = "http://localhost:5000/api/blog"



const Modifarticle = () => {
    const[title,setTitle]=useState("")
    const[body,setBody]=useState("")
    const[date,setDate]=useState("")
    const[title2,setTitle2]=useState("")
    const[body2,setBody2]=useState("")
    const[date2,setDate2]=useState("")
    const [post,setPost] = useState([]);
    const[img,setImg]=useState("")
    const match = useRouteMatch();
    const blogurl=`${url}/${match.params.titleurl}`

    



    // appel article a modifier
    const getSingle = async () =>{ 
         
        const res = await axios.get(blogurl);

        setTitle(res.data.title)
        setBody(res.data.body)
        setDate(res.data.date)
        setImg(res.data.img)
        try {
        } catch (error) {
            console.error(error);
        }
    }
    // modification du post
    async function uploadData() {

        try {
            
            const res =await axios.put(blogurl, post);
            console.log(res)
            console.log(post)
            window.location.href = 'http://localhost:3000/actualite'
            

        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        setPost({
            ...{title},
            ...{body},
            ...{date} 
        });
        setBody2(body)
        setDate2(date)
        setTitle2(title)

        const off=document.querySelector('.off')
        if(off!==null){
        off.classList.remove('off')

    }
}
      


    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getSingle()},[]
    )
    


    return (
        <div className="container">
            <form >
                <div>
                    <label htmlFor="name">Titre de l'article</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'value={title}
                    onChange={(e)=>{
                        const tag =e.target.value;
                        setTitle(tag)
                    }
                    }/>
                </div>
                <div>
                    <label htmlFor="desc">Image Description</label>
                    <textarea type="text" className="form-control"required placeholder=""id='username-input'value={body}
                    onChange={e=>setBody(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="name">Date</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'value={date}
                    onChange={e=>setDate(e.target.value)}/>
                </div>

                <button key="submit"onClick={handleSubmit}>Previsualiser</button>
            </form>

            <div className="article-alone off">
                <h2 className="title-single">{title2}</h2>
                <img className="img" alt='Ilustration article Blog' src={img}></img>
                <pre className="content-single">{body2}</pre>
            <p className="date-single">{date2}</p>
            <button onClick={uploadData}>Sauvegarder les modifications</button>
            </div>

        </div> 

  
    )
}
export default Modifarticle