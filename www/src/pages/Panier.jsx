import React, { useContext, useEffect, useState,  } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../js/UserContext';

const Panier = () => {
    
    
    const [cart,setCart]=useState('')
    const [items,setItems]=useState([])

    const{user}=useContext(UserContext)
        
        async function getcart(){
            const userid=`${user._id}`
            const urlCart = `http://localhost:5000/api/cart/${user._id}`
            try{
                const res = await fetch(urlCart,{method:'GET',param:{userid:userid}})
                res.json()
                .then((res)=>{
                    setCart(res.data)
                    setItems(res.data.items)

                })
                
            }catch(error){
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }


    
    
    
    
    
    if(!user){
        
        return (
            
                <h2>veuillez vous connecter pour voir votre panier</h2>
               
                    
           
)}else{
    if(!cart){
getcart()
    }
    


    return(
        <div>
            <h1>Votre Panier
</h1>        
        {items.map((u,i)=>{
            return(
                <>
            <p>{u.productId.name}</p>
            <p>{u.price}€</p>
            <p>{u.quantity}</p>
            </>
        )})} 
            <h3>prix total {cart.subTotal}€</h3>   


                <Link to='/Paiement'><div>Passer a la commande</div></Link>
    
        </div>
    )
    }
}

export default Panier
