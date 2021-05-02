import axios from 'axios'
import React, {useEffect, useState } from 'react'

const Order = (user) => {
    document.title="Mes compte - Montecaos";


    const[order,setOrder]=useState('')

    async function TakeOrder() {

        try {
            const url=`http://localhost:5000/api/order/${user.user._id}`
            const res = await axios.get(url);
                  setOrder(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        TakeOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    if(!order){
        return(    
            <p>vous n'avez pas fait de commande</p>
            )
    }else{

        return (
            <>
            <h2>Mes commandes</h2>
                <div>

            {order.map((p,i)=>{
                const{subTotal,_id,items,createdAt}=p
                return(
                      <div key={_id} className='container-order-customer'>
                        <div className='margin-left'>Numéro de commande: <strong>{_id}</strong></div>

                        <div className='margin-left'>Date de commande: <strong>{createdAt.substr(8,2)}-{createdAt.substr(5,2)}-{createdAt.substr(0,4)}</strong></div>
                        <div className='full'>
      
                          <div className='objet'>
                            <div className='product'>
                              <p className='margin-left'>Nom du produit</p>  
                              <p>prix unitaire</p>

                            </div>
                            <div className='line'/> 
      
                            {items.map((b,n)=>{                   
                              return(
                                <>
                                  <div className='product'>
                                    <p>{b.productName}
                                    <br/>
                                     Quantité : <strong>{b.quantity}</strong></p>
                                    <p className='margin-right'>{b.price}€</p>
      
                                  </div>
                                  <div className='line'/>   
                                </>
                              )})}       
                          </div> 

                          </div>
                          <p className='price-total'>Prix total : <strong>{subTotal}€</strong></p>   
      
                        </div>
      
      
                )
              })}
      
            <div className='bottom'></div>
            </div>
            <div className='bottom'></div>

          </>
          )
        }
      }
export default Order