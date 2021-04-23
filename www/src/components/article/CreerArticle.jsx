import axios from 'axios'
import React,{useEffect, useState} from 'react'

const CreerArticle  = () => {

    const[title,setTitle]=useState("")
    const[titleurl,setTitleUrl]=useState("")
    const[body,setBody]=useState("")
    const[date,setDate]=useState("")
    const[img,setImg]=useState("")
    const [post,setPost] = useState([]);
    const[title2,setTitle2]=useState("")
    const[body2,setBody2]=useState("")
    const[date2,setDate2]=useState("")

    const espace = / /gi

    async function uploadData() {
        const formData = new FormData();
        const inpFile = document.querySelector(".inputfile")
        const file = inpFile.files[0]      
        formData.append("img", file);
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
            window.location.href = 'http://localhost:3000/actualite'
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }



    useEffect(() => {
        setPost({
            ...{titleurl},
            ...{title},
            ...{body},
            ...{date},
            ...{img}
        });
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setPost({
            ...{titleurl},
            ...{title},
            ...{body},
            ...{date},
            ...{img}
            
        });


        setBody2(body)
        setDate2(date)
        setTitle2(title)


        const inpFile = document.querySelector(".inputfile")
        const file = inpFile.files[0]
        const previewImage = document.querySelector(".image-preview")
            if(file){
                const reader = new FileReader();

                reader.addEventListener("load",function(){
                    previewImage.setAttribute("src",this.result)
                })
                reader.readAsDataURL(file)
            }        
        const off=document.querySelector('.off')
        if(off!==null){
        off.classList.remove('off')


    }
}

  
      return (
        
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Titre de l'article</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'
                    onChange={(e)=>{
                        let tag =e.target.value;
                        setTitle(tag)
                        setTitleUrl(tag.replace(espace,"-"))
                        const accent = [
                        /[\300-\306]/g, /[\340-\346]/g, // A, a
                        /[\310-\313]/g, /[\350-\353]/g, // E, e
                        /[\314-\317]/g, /[\354-\357]/g, // I, i
                        /[\322-\330]/g, /[\362-\370]/g, // O, o
                        /[\331-\334]/g, /[\371-\374]/g, // U, u
                        /[\321]/g, /[\361]/g, // N, n
                        /[\307]/g, /[\347]/g, // C, c
                    ];
                    const noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
                    for(let i = 0; i < accent.length; i++){
                        tag = tag.replace(accent[i], noaccent[i]);
                    }
                    setTitleUrl(tag.replace(espace,"-").replace("!","").replace(':',''))
                    }
                    }/>
                </div>
                <div>
                    <label htmlFor="desc">Contenu de l'article</label>
                    <textarea type="text" className="form-control"required placeholder=""id='username-input'
                    onChange={(e)=>{
                    const newBody=e.target.value
                    setBody(newBody)
                    }
                }/>
                </div>
                <div>
                    <label htmlFor="name">Date</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'
                    onChange={e=>setDate(e.target.value)} />
                </div>
                <input
                    type="file"
                    className="custom-file-input inputfile"
                    id="inputGroupFile01 "
                    aria-describedby="inputGroupFileAddon01"
                    onChange={(e)=>{
                        setImg("http://localhost:5000/api/blog/image/"+ e.target.value.substr(12))}}
                    />
                <button key="submit"onClick={handleSubmit}>Submit</button>
            </form>
            <div className="article off">
                <h2 className="title-single">{title2}</h2>
                <div className="container-image-Preview">
                    <img src="" alt="Preview" className='image-preview'/>
                </div>
                <pre className="content-single">{body2}</pre>
            <p className="tags-single">{date2}</p>
            <button onClick={uploadData}>Sauvegarder les modifications</button>
            </div>
        </div>
      );
    }
  

export default CreerArticle
