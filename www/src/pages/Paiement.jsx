import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../js/UserContext'
import { PayPalButton } from "react-paypal-button-v2";

const Paiement = () => {

  const [price,setPrice]=useState('')


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

    const [showPaypal,setShowPaypal]=useState(false);
    
      const showPaypalButtons = () => {
        getcart()
       setShowPaypal(true);

      };

      if(!showPaypal){
      return (
        <>
          <div>
            aaa
        <button onClick={showPaypalButtons}> Pay </button>
        </div>
        </>
      )}else{
        return(
          <>
          <PayPalButton
          amount={price}
          onSuccess={(details, data) => {

            window.location.href = 'http://localhost:3000/boutique'

            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID
              })
            })
            
          
          }}
        />
        </>
        )
      }


         
      
  
}
  

export default Paiement
