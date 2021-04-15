import React, { useState, useEffect } from 'react'
import { useRouteMatch} from 'react-router-dom'
import axios from 'axios'



const url = "http://localhost:5000/api/shop"



const ModifProduct = () => {
    const[name,setName]=useState("")
    const[description,setDescription]=useState("")
    const[price,setPrice]=useState("")
    const[feature,setFeature]=useState("")
    const[feature2,setFeature2]=useState("")
    const[name2,setName2]=useState("")
    const[body2,setBody2]=useState("")
    const[date2,setDate2]=useState("")
    const [product,setProduct] = useState([]);
    const[img,setImg]=useState("")
    const match = useRouteMatch();
    const producturl=`${url}/${match.params.producturl}`

    



    // appel article a modifier

    // modification du product
    async function uploadData() {

        try {
            
            const res =await axios.put(producturl, product);
            console.log(res)
            console.log(product)
            window.location.href = 'http://localhost:3000/boutique'
            

        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        setProduct({
            ...{name},
            ...{description},
            ...{price},
            ...{feature} 
        });
        setBody2(description)
        setDate2(price)
        setName2(name)
        setFeature2(feature)

        const off=document.querySelector('.off')
        if(off!==null){
        off.classList.remove('off')

    }
}
         



    useEffect(()=>{
        async function  getSingle(){
            const res = await axios.get(producturl);

            setName(res.data.name)
            setDescription(res.data.description)
            setPrice(res.data.price)
            setImg(res.data.img)
            setFeature(res.data.feature)
            try {
            } catch (error) {
                console.error(error);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getSingle()},[])
    


    return (
        <div className="container">
            <form >
                <div>
                    <label htmlFor="name">Titre de l'article</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'value={name}
                    onChange={(e)=>{
                        const tag =e.target.value;
                        setName(tag)
                    }
                    }/>
                </div>
                <div>
                    <label htmlFor="desc"> Description</label>
                    <textarea type="text" className="form-control"required placeholder=""id='username-input'value={description}
                    onChange={e=>setDescription(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="name">Date</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'value={price}
                    onChange={e=>setPrice(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="desc">feature</label>
                    <textarea type="text" className="form-control"required placeholder=""id='username-input'value={feature}
                    onChange={e=>setFeature(e.target.value)}/>
                </div>

                <button key="submit"onClick={handleSubmit}>Previsualiser</button>
            </form>

            <div className="article off">
                <h2 className="name-single">{name2}</h2>
                <img className="img" alt='Ilustration article Blog' src={img}></img>
                <pre className="content-single">{body2}</pre>

            <p className="tags-single">{date2}</p>
            <pre className="content-single">{feature2}</pre>

            <button onClick={uploadData}>Sauvegarder les modifications</button>
            </div>

        </div> 

  
    )
}
export default ModifProduct