import axios from 'axios';
import React, { useContext, useState,  } from 'react'
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
                    console.log(res.data)
                    setCart(res.data)
                    setItems(res.data.items)

                })
                
            }catch(error){
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
        async function  emptyCart(){
            const url = `http://localhost:5000/api/cart/empty-cart/${user._id}`

            try{
                const res = await axios.delete(url)
                window.location.href = 'http://localhost:3000/panier'

                console.log(res)
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
        <div className='cart'>
  
            <h1>Votre Panier</h1>
        <button onClick={emptyCart}>Vider le panier</button>
      

        {items.map((u,i)=>{
            console.log(u)
            return(
                <div className='product'>
            <div className='product-detail'>
                <h3>{u.productName}</h3>
               <h3>Prix unitaire : {u.price}€</h3>
            </div>
            <div className='product-detail'>
                <p>Quantité: {u.quantity}</p>
                <h3>prix du lot: {u.total}€</h3>
            </div>


                </div>
        )})} 
        <div>
            
        </div>
            <div className='product-total'>
                <Link className='btn' to='/Paiement'><div>Passer a la commande</div></Link>
                <h2>prix total {cart.subTotal}€</h2>   
            </div>
            <div className='bottom'></div>

    
        </div>
    )
    }
}

export default Panier
