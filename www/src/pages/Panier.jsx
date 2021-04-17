import React, { useContext, useEffect, useState,  } from 'react'
import { UserContext } from '../js/UserContext';

const Panier = () => {
    
    
    const [cart,setCart]=useState('')
    async function getcart(){
        const userid=`${user._id}`
        const urlCart = `http://localhost:5000/api/cart/${user._id}`
        console.log(userid)
        try{
            const res = await fetch(urlCart,{method:'GET',param:{userid:userid}})
            res.json()
            .then((res)=>{
                setCart(res.data)
                console.log(cart)
            })
            
        }catch(error){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }
    const{user}=useContext(UserContext)



    
    
    
    
    if(!user){

        return (
            
                <h2>veuillez vous connecter pour voir votre panier</h2>
               
                    
           
)}else{
    document.addEventListener('DOMContentLoaded', function() {
        console.log('HTML prêt !');
      });
    


    return(
        <div>Bonjour {user.nom}
        <button onClick={getcart}>Voir le panier</button>
        
        <h3>{cart.subTotal}</h3>
        </div>
    )
    }
}

export default Panier
