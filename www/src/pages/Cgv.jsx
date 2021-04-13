import axios from 'axios'
import React,{useEffect, useState} from 'react'

const Cgv  = () => {

    const[title,setTitle]=useState("")
    const[titleurl,setTitleUrl]=useState("")
    const[body,setBody]=useState("")
    const[date,setDate]=useState("")
    const[img,setImg]=useState("")
    const [post,setPost] = useState([]);

    const espace = / /gi
    async function uploadData() {
        const formData = new FormData();
        const file = document.getElementById("inputGroupFile01").files;
        formData.append("img", file[0]);
        const blogurl="http://localhost:5000/api/blog"
        const imgurl="http://localhost:5000/api/blog/image"
        try {
            const uploadImage = await axios.post(imgurl, formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });
            const createPost = await axios.post(blogurl, post);
            console.log(createPost)
            console.log(uploadImage)
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }



    useEffect(() => {
        console.log(post)
        uploadData();
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        setPost({
            ...{titleurl},
            ...{title},
            ...{body},
            ...{date},
            ...{img}
        });
    }
    
  
      return (
        
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Titre de l'article</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'value={title}
                    onChange={(e)=>{
                        const tag =e.target.value;
                        setTitle(tag)
                        setTitleUrl(tag.replace(espace,"-"))
                    }
                    }/>
                </div>
                <div>
                    <label htmlFor="desc">Contenu de l'article</label>
                    <textarea type="text" className="form-control"required placeholder=""id='username-input'value={body}
                    onChange={e=>setBody(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="name">Date</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'value={date}
                    onChange={e=>setDate(e.target.value)}/>
                </div>
                <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={e=>setImg("http://localhost:5000/api/blog/image/"+ e.target.value.substr(12))}
                    />

                
                <button key="submit"onClick={handleSubmit}>Submit</button>
            </form>
        </div>
      );
    }
  

export default Cgv
