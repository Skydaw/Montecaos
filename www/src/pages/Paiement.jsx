import React, { useContext, useState } from 'react'
import { UserContext } from '../js/UserContext'
import { PayPalButton } from "react-paypal-button-v2";
import axios from 'axios';
import { Redirect } from 'react-router';
import Remerciement from './Remerciement';

const Paiement = () => {

  const [price,setPrice]=useState('')
  const [data,setData]=useState('')
  const[redirect,setRedirect]=useState('')
  const[remerciement,setRemerciement]=useState('')
 
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
        setRedirect(true)

      }
      const showPaypalButtons = () => {
        getcart()
       setShowPaypal(true);

      };
      if(redirect){

        return<Redirect to='/compte'></Redirect>
      }
      if(remerciement){
        return<Remerciement/>
      }

      if(!showPaypal){
        document.title="Adresse de livraison - Montecaos";

      return (
        <div className='paiement'>
          <h1>Paiement</h1>
          <div className='delivery'>
            <h2>Votre adresse de livraison</h2>
            <div className='adress'>
              <p><span>{user.prenom} {user.nom}</span></p>
              <p>{user.adresse}</p>
              <p>{user.complement}</p>
              <p> {user.codepostal} {user.ville}</p>
              <p> {user.pays}</p>
              <p> {user.telephone}</p>
            </div>

            <div className='container-btn'>
              <div className='btn' onClick={show}>Changer d'adresse </div>

              <div className='btn' onClick={showPaypalButtons}>Continuer vers le paiement</div>
            </div>
          </div>
          <div className='bottom'></div>
        </div>
      )}else{
        document.title="Paiement - Montecaos";

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
                    setRemerciement('true')

                  }}
                  />
                  </div>
                  <div className='bottom'></div>

                </div>     
        
        )
      }


         
      
  
}
  

export default Paiement
