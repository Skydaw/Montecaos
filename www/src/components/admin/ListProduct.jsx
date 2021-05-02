import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import{Link} from'react-router-dom'
import { UserContext } from '../../js/UserContext';




const ListProduct = () => {
    
    const{user}=useContext(UserContext)
    const[userid,setUserdid]=useState('')

    const url = "http://localhost:5000/api/shop"; 
    const [product,setProduct] = useState([]);
    
  
    async function getPosts() {
      try {
        const res = await axios.get(url);
        setProduct(res.data);
  
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(()=>{
      getPosts()    
    },[])


    
    

    
    
    return(
        <div className='list-item'>    

        
        {product.map((p,i) => {

            const { _id, producturl, name, price, img,order} = p;

            const imgName= img.substr(37)
            async function del() {
                const imgUrl =`${url}/image/${imgName}`;
                 const productUrl=`${url}/${producturl}`;
                try {
                    const res =await axios({    
                        method:'delete',
                        url:productUrl, 
                        params:{userid}});
                        const ris =await axios({    
                            method:'delete',
                            url:imgUrl, 
                            params:{userid}});
                    console.log(ris)
                    console.log(res)
                    window.location.href = 'http://localhost:3000/boutique'
                    
        
                } catch (error) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            }
            function verif(){
                setUserdid(user._id)
                const clss =`.delmethod${producturl}`
                const objet = document.querySelectorAll(clss)
                objet.forEach(function(removeClass){
                    removeClass.classList.remove('hide')
                })
            }
            function hide(){
                const clss =`.delmethod${producturl}`
                const objet = document.querySelectorAll(clss)
                objet.forEach(function(removeClass){
                    removeClass.classList.add('hide')
                })
            }
             

            
            return (
                
            <div className='container'style={{order:order}}>

                <div className="item"key={_id} >

                        <img className="img" alt='Ilustration article Blog' src={img}></img>
                        <h2  className="item-name">{name}</h2>

                        <p  className="item-price">{price}€</p>

                    
                </div>

                <Link  to={`/admin/product/modifier/${producturl}`}>Modifier</Link>
                <button  onClick={verif}>Suprimmer l'article</button>
                <p className={`delmethod${producturl} hide`}>Êtes-vous sûrs ?</p>
                <button className={`delmethod${producturl} hide`} onClick={del}>Oui</button>
                <button  className={`delmethod${producturl} hide`} onClick={hide}>Non</button> 
            </div>
        )
        
        })}
        </div>
    )    
}



export default ListProduct
