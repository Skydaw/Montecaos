import React from 'react'
import { Link } from 'react-router-dom'

const Choose = () => {
    return (
        <div className='admin-div'>
            <div className='btn-admin-list'>
                <div className='btn-admin'><Link to ='admin/actualite'>Article</Link></div>
                <div className='btn-admin'><Link to ='admin/product'>Produit</Link></div>
                <div className='btn-admin'><Link to ='admin/commande'>Commande</Link></div>
            </div>
            <div className='disconect'>Se deconnecter</div>
        </div>
    )
}

export default Choose
