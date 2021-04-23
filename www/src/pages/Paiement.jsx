import React, { useContext, useState } from 'react'
import { UserContext } from '../js/UserContext'
import { PayPalButton } from "react-paypal-button-v2";
import axios from 'axios';

const Paiement = () => {

  const [price,setPrice]=useState('')
  const [data,setData]=useState('')
 


    const{user}=useContext(UserContext)
    
        
        async function getcart(){
            const userid=`${user._id}`
            const urlCart = `http://localhost:5000/api/cart/${user._id}`
            try{
                const res = await fetch(urlCart,{method:'GET',param:{userid:userid}})
                res.json()
                
                .then((res)=>{
                    setData(res.data)
                    setPrice(res.data.subTotal)
                    
                })
                
            }catch(error){
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
        async function order(){
          console.log(data)
          const urlOrder = `http://localhost:5000/api/order/`

          try{
            axios.post(urlOrder,{
              data
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

              console.log(res)
          }catch(error){
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
          }
      }


    const [showPaypal,setShowPaypal]=useState(false);
      function show (){
        window.location.href = 'http://localhost:3000/compte/'

      }
      const showPaypalButtons = () => {
        getcart()
       setShowPaypal(true);

      };

      if(!showPaypal){
      return (
        <div className='paiement'>
          <h1>Paiement</h1>
          <div className='delivery'>
            <h2>Votre adresse de livraison</h2>
            <p>{user.prenom} {user.nom}</p>
            <p>Adresse: <span>{user.adresse}</span></p>
            <p>Complement d'adresse: <span>{user.complement}</span></p>
            <p>Code postal:<span> {user.codepospal}</span></p>
            <p>Ville:<span> {user.ville}</span></p>
            <p>Pays:<span> {user.pays}</span></p>
            <p>Telephone:<span> {user.telephone}</span></p>

            <div className='container-btn'>
              <div className='btn' onClick={show}>Changer d'adresse </div>

              <div className='btn' onClick={showPaypalButtons}>Continuer vers le paiement</div>
            </div>
        </div>
            <div className='bottom'></div>
        </div>
      )}else{
        return(
          <div className='paiement'>
            <h2>A payer : {price}€</h2>
            <div  className='delivery'>

            <PayPalButton
                createOrder={(data, actions) => {
                  return actions.order.create({    
                    purchase_units: [{
                      amount: {
                        currency_code: "EUR",
                        value: `${price}`,
                      }}],
                    });
                  }}
                  onApprove={() => { 
                    order()
                    emptyCart()
                    window.location.href = 'http://localhost:3000/'
                  }}
                  />
                  </div>
                  <div className='bottom'></div>

                </div>     
        
        )
      }


         
      
  
}
  

export default Paiement
