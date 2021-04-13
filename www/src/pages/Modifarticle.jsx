import React, { useState, useEffect } from 'react'
import {Redirect, useRouteMatch} from 'react-router-dom'
import axios from 'axios'



const url = "http://localhost:5000/api/blog"



const Modifarticle = () => {
    const[title,setTitle]=useState("")
    const[body,setBody]=useState("")
    const[date,setDate]=useState("")
    const [post,setPost] = useState([]);
    const match = useRouteMatch();
    const blogurl=`${url}/${match.params.titleurl}`
    // const[redirect,setRedirect]=useState("")

    
    const handleSubmit = (e) => {
        setPost({
            ...{title},
            ...{body},
            ...{date} 
        });
        e.preventDefault();
    }


    // appel article a modifier
    const getSingle = async () =>{  
        const res = await axios.get(blogurl);

        setTitle(res.data.title)
        setBody(res.data.body)
        setDate(res.data.date)
        try {
        } catch (error) {
            console.error(error);
        }
    }
    // modification du post
    async function uploadData() {

        try {
            console.log(post)
            const res = await axios.put(blogurl, post);
            console.log(res)

        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }






      


    useEffect(()=>{
        getSingle()},[]
    )
    // if(redirect){   
    //     return <Redirect to="/actualite"/>
    //     }
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
                    <input type="text" className="form-control"required placeholder=""id='username-input'value={body}
                    onChange={e=>setBody(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="name">Date</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'value={date}
                    onChange={e=>setDate(e.target.value)}/>
                </div>

                <button key="submit"onClick={handleSubmit}>Submit</button>
            </form>
            <button onClick={uploadData}>Go</button>
        </div> 

  
    )
}
export default Modifarticle