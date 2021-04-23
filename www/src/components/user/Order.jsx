import axios from 'axios'
import React, {useEffect, useState } from 'react'

const Order = (user) => {

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
                    <>
                    <div key={_id}>Numéro de commande {_id}</div>
                    <div>Date de commande {createdAt.substr(8,2)}-{createdAt.substr(5,2)}-{createdAt.substr(0,4)}</div>
                {items.map((b,n)=>{                   
                    return(
                        <div>
                        <p>produit {b.productName}</p>
                        <p>quantité {b.quantity}</p>
                        <p>prix unitaire {b.price}€</p>
                        <p>prix du groupe {b.total}€</p>
                        </div>
                    )})}       
                    <div>Prix total {subTotal}</div>
                
                    </>
                    )
                })}
                </div>
                </>
     )
    }
}

export default Order