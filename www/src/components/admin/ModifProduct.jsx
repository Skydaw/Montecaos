import React, { useState, useEffect, useContext } from 'react'
import { useRouteMatch} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../js/UserContext'



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
    const[product,setProduct] = useState([]);
    const[img,setImg]=useState("")
    const match = useRouteMatch();
    const producturl=`${url}/${match.params.titleurl}`
    const[userid,setUserdid]=useState('')
    const[order,setOrder]=useState('')


    const{user}=useContext(UserContext)

    




    // modification du product
    async function uploadData() {

        try {
            console.log(producturl)
            
            const put =await axios({    
                method:'PUT',
                url:producturl, 
                data:{product,userid}});
            
            console.log(put)    

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
            ...{feature},
            ...{order}

        });
        setBody2(description)
        setDate2(price)
        setName2(name)
        setFeature2(feature)
        setUserdid(user._id)

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
            setOrder(res.data.order)
            try {
            } catch (error) {
                console.error(error);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getSingle()},[])
    


    return (
        <div key={img}className="create-container">
            <form >
                <div>
                    <label htmlFor="name">Nom du prduit</label>
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
                    <label htmlFor="name">Prix(ne pas mettre le symbole €)</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'value={price}
                    onChange={e=>setPrice(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="desc">Caracteristiques du produit(bio ou autre)</label>
                    <input type="text" className="form-control"required placeholder=""id='username-input'value={feature}
                    onChange={e=>setFeature(e.target.value)}/>
                </div>
                <div>
                Ordre d'aparition dans la page
                <select name="number" value={order} id="number-cart" onClick={
                    e=>setOrder(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
                </div>

                <button key="submit"onClick={handleSubmit}>Previsualiser</button>
            </form>

            <div className="off">
                <div  className="solo-item ">

                <img className="img" alt='Ilustration article Blog' src={img}></img>
                <div className='bloc'>
                    <h2 className="title-single">{name2}</h2>
                    <p className="content-single">{body2}</p>
                    <p className="tags-single">{date2}€</p>
                    <p clclassName="content-single">{feature2}</p>
                </div>
                </div>
            <button onClick={uploadData}>Sauvegarder les modifications</button>
            </div>
            

        </div> 

  
    )
}
export default ModifProduct