import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Commandes = ({user}) => {
    const [order,setOrder]=useState('')
    const [users,setUsers]=useState([])


    async function getUser(id){
      const url=`http://localhost:5000/api/user/${id}`
      const res = await axios({
        method:'GET',
        url:url
      });
      setUsers(res.data)           
    }

    async function getOrder() {
      
      try {
          const res = await axios({
              method:'GET', 
              url:'http://localhost:5000/api/order/',
              params:{userid:user._id}
            });
          setOrder(res.data);
          console.log(res.data)
    
        } catch (error) {

        }
      }

 useEffect(()=>{
      getOrder()    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

if(!order){
    return(
    <div>
      Pas de commande
    </div>
  )}
else{

  return (
    <>
    <div className='command-container'>
          {order.map((p,i)=>{
            function user(){
              getUser(userid)
              const clss =`.user${_id}`
              const rehide=".rehide"
              const recacher =document.querySelectorAll(rehide)
              recacher.forEach(function(removeClass){
                removeClass.classList.add('hide')
            })
              const objet = document.querySelectorAll(clss)
              objet.forEach(function(removeClass){
                removeClass.classList.remove('hide')
            })

            }
            const{userid,_id,items,createdAt}=p
      
            return(
              <>
                <div  className='container-order'>
                  <div key={_id}>Numéro de commande: <strong>{_id}</strong></div>

                  <div>Date de commande: <strong>{createdAt.substr(8,2)}-{createdAt.substr(5,2)}-{createdAt.substr(0,4)}</strong></div>
                  <div className='full'>

                    <div className='objet'>
                      <div className='product'>
                        <p className='margin-left'>Nom du produit</p>  
                        <p >quantité</p>
                      </div>
                      <div className='line'/> 

                      {items.map((b,n)=>{                   
                        return(
                          <>
                            <div className='product'>
                              <p>{b.productName}</p>  
                              <p className='margin-right'>{b.quantity}</p>

                            </div>
                            <div className='line'/>   
                          </>
                        )})}       
                    </div>
                    <div className='adress'>

                      <button onClick={user}>Voir adresse client</button>
                      <div className={`hide rehide user${_id}`} >
                      <div>{users.prenom} {users.nom}</div>
                      <div>{users.adresse}</div>
                      <div>{users.complement}</div>
                      <div>{users.codepostal} {users.ville}</div>
                      <div>{users.pays}</div>
                      <div>{users.telephone}</div>
                    </div>

                  </div>

                </div>

              </div>
            </>
          )
        })}

      
      </div>
    </>
    )
  }
}

export default Commandes
