import axios from 'axios'
import React,{useEffect, useState} from 'react'

const CreerProduit  = () => {

    const[producturl,setProducturl]=useState("")
    const[name,setName]=useState("")
    const[description,setDescription]=useState("")
    const[price,setPrice]=useState("")
    const[feature,setFeature]=useState("")
    const[img,setImg]=useState("")
    const [product,setProduct] = useState([]);
    const[feature2,setFeature2]=useState("")
    const[name2,setName2]=useState("")
    const[body2,setBody2]=useState("")
    const[date2,setDate2]=useState("")

    const espace = / /gi


    async function uploadData() {
        const formData = new FormData();
        const inpFile = document.querySelector(".inputfile")
        const file = inpFile.files[0];
        formData.append("img", file);
        const blogurl="http://localhost:5000/api/shop"
        const imgurl="http://localhost:5000/api/shop/image"
        try {            
            const uploadImage = await axios.post(imgurl, formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
            })
            
            const createPost = await axios.post(blogurl, product);
            console.log(createPost)
            console.log(uploadImage)

            window.location.href = 'http://localhost:3000/boutique'
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }



    useEffect(() => {
        setProduct({
            ...{producturl},
            ...{name},
            ...{description},
            ...{price},
            ...{feature},
            ...{img}
        });
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setProduct({
            ...{producturl},
            ...{name},
            ...{description},
            ...{price},
            ...{feature},
            ...{img}
        });
        setBody2(description)
        setDate2(price)
        setName2(name)
        setFeature2(feature)

        const inpFile = document.querySelector(".inputfile")
        const previewImage = document.querySelector(".image-preview")
        
        
            const file = inpFile.files[0]
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
                    <label htmlFor="name">Nom du produit</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'
                    onChange={(e)=>{
                        let tag =e.target.value;
                        setName(tag)
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
                    setProducturl(tag.replace(espace,"-"))

                    }
                    }/>
                </div>
                <div>
                    <label htmlFor="desc">Info Produit</label>
                    <textarea type="text" className="form-control"required placeholder=""id='username-input'
                    onChange={(e)=>{
                    const newBody=e.target.value
                    setDescription(newBody)
                    }
                }/>
                </div>
                <div>
                    <label htmlFor="name">Prix</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'
                    onChange={e=>setPrice(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="name">Caracteristiques du produit</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'
                    onChange={e=>setFeature(e.target.value)}/>
                </div>
                <input
                    type="file"
                    className="custom-file-input inputfile"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={e=>setImg("http://localhost:5000/api/shop/image/"+ e.target.value.substr(12))}
                    />
                    <button key="submit"onClick={handleSubmit}>Previsualiser</button>
            </form>

            <div className="article off">
                <h2 className="name-single">{name2}</h2>
                <div className="container-image-Preview">
                    <img src="" alt="Preview" className='image-preview'/>
                </div>
                <pre className="content-single">{body2}</pre>

            <p className="tags-single">{date2}</p>
            <pre className="content-single">{feature2}</pre>

            <button onClick={uploadData}>Sauvegarder les modifications</button>
        </div>
        </div>
      );
    }
  

export default CreerProduit
