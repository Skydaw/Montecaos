import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <ul>
                <Link to ='/conditions-generales-de-vente'>Conditions générales de vente</Link>
                <Link to ='/mentions-legales'>Mentions légales</Link>
                <Link to ='/politique-de-confidentialite'>Politque de confidentialité </Link>
                <Link to ='/contact'>Nous contacter</Link>
            </ul>
            <div>Créer par Sébastien Avenet @ 2021</div>
        </footer>
    )
}

export default Footer
