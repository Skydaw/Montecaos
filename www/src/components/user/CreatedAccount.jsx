import React, { useState } from 'react'
import { Redirect } from 'react-router'

const CreatedAccount = () => {
    const[redirect,setRedirect]=useState("")
    const redirection=()=>{
        setRedirect(true)
    }

    if(redirect){
        return <Redirect to="/compte"/>
        }
    return (
        <div className='container-account'>
            Votre compte a bien était creer!!!
            <div className='redirection' onClick={redirection}>
                Retour vers la page de connection
            </div>

        </div>
    )   
}

export default CreatedAccount
