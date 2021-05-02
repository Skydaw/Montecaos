import axios from 'axios';
import React, {  } from 'react'
import { Link  } from 'react-router-dom'

const Choose = () => {
    document.title="Admin - Montecaos";

    async function eatCookie(){
        await axios(
           { method: 'POST',
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
            url:'http://localhost:5000/api/user/logout'}
        );
        window.location="http://localhost:3000/"
        
        }

    return (
        <div className='admin-div'>
            <div className='btn-admin-list'>
                <div className='btn-admin'><Link to ='admin/actualite'>Article</Link></div>
                <div className='btn-admin'><Link to ='admin/product'>Produit</Link></div>
                <div className='btn-admin'><Link to ='admin/commande'>Commande</Link></div>
                <div className='disconect' onClick={eatCookie}>Se déconnecter</div>
            </div>
        </div>
    )
}

export default Choose
