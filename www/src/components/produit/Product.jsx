import React, { useState, useEffect, useContext } from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../js/UserContext'



const url = "http://localhost:5000/api/shop"



const Product = () => {
    const{user}=useContext(UserContext);

    const[single,setSingle]=useState({});
    const[qte,setQte]=useState('1')

    
    const match = useRouteMatch();
    
    
    
    const getSingle = async () =>{  
        const res = await axios.get(`${url}/${match.params.producturl}`);
        
    
        setSingle(res.data);

        
        try {
        } catch (error) {
            console.error(error);

        }

    }
    document.title=`${single.name} - Montecaos`;


    function addCart(){
        if(!user){
            document.location.href="http://localhost:3000/compte"
        }else{
            const userid=`${user._id}`
            const urlCart = `http://localhost:5000/api/cart/`
            try{
                axios.post(urlCart,{
                    userid, 
                    _id:single._id,
                    name:single.name,
                    price:single.price,
                    quantity:qte,
                })
                .then(
                    direct()
                )
            }catch(error){
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }
    async function direct(){
        // eslint-disable-next-line no-implied-eval
        setTimeout('window.location="http://localhost:3000/panier";'
        ,100)
    }
        function go(){
            addCart()

        }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getSingle()},[]
    )
    return (
        <>
        <Link className='return' to='/boutique'>←Retour a tous les produits</Link>
        <div className="solo-item">
            <div className='img-container' >

            <img className="img" alt='Ilustration article Blog' src={single.img}/>
            </div>
            <div className='bloc'>
                <h2 className="title-single">{single.name}</h2>
                <div className='sous-bloc'>
                    <p className="tags-single">{single.price}€</p>
                    <div>
                        <div>
                            <strong>Quantité:</strong>
                            <select name="number" id="number-cart" onClick={
                                e=>setQte(e.target.value)}>
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
                        <div className='btn' onClick={go}>Ajouter au panier</div>
                    </div>
                </div>
                <div className='bloc-complement'>
                    <div>

                        <h3>Description</h3>
                        <p className="content-single">{single.description}</p>
                        <h3>Ingredients</h3>
                        <p>
                            -Farine
                            <br/>
                            -Sucre
                            <br/>
                            -Huile d'arachide
                            <br/>
                            -Cannelle
                        </p>
                        <h3>Livraions</h3>
                        <p>
                        Pour toute commande passée sur notre site internet du lundi matin au vendredi soir inclus, la fabrication et l’expédition se feront sous 48h (excepté en période de forte affluence, où cela peut quelque fois atteindre 72h).
                        <br/>
                        <br/>
                        Afin de conserver leur intégrité, nos biscuits montecaos sont ensuite emballés sous vide. L’envoi s’effectue sous pli protégé. 
                        <br/>
                        <br/>
                        Les colis sont expédiés par La Poste et livrés directement dans votre boite au lettre, et livrés sous 48h/72h.
                        </p>
                    </div>

                </div>
                    
                    

            </div>
        </div>
        <div className='bottom'></div>
        </>
    )
}
export default Product
