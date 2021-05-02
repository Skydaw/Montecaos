import React from 'react'
import { Link } from 'react-router-dom'

const Accueil = () => {
      document.title="Montecaos - Douceur et Gourmandise";

    return (

        <div className="main">
            <div className='main-section'>
                <div>
                    <h1>
                    LES BISCUITS MONTECAOS  
                    </h1>
                    <p className="main-text">Biscuiterie artisanale Niçoise.
                    <br/>
                    Gateau fait maison ,des ingredients de qualité.
                    <br/>
                    Une recette Familial transmis de generation en generation.
                    <br/>
                    Pour offrir ou partager d’agréables moments entre amis ou en famille.</p>
                    <Link to="/boutique" className='link-boutique'>Chez vous en quelques Clics →</Link>
                </div>
            </div>
            <div className='home-history'>
                <div className='container'>
                <div className='history'>
                    <div>
                        <h2>Un peu d'histoire</h2>
                        <div className='line-separator'></div>
                        <p className="text">De nombreuse personne se souvienne encore du gout de ces fameux sable au gout si unique.
                        <br/>
                        Les montécaos sont des biscuits très connus originaire d'Afrique du nord.
                        <br/>
                        Ils sont souvent présent sur nos tables de fin d'années, particulierement durant noel.
                        </p>
                        <Link to="/biscuits" >En savoir plus sur nos biscuits →</Link>
                        </div>
                    </div>
                </div>
                <div className='container'>
                <div className='fabrique'>
                    <div>
                        <h2>La fabrication</h2>
                        <div className='line-separator'></div>
                        <p className="text">Isabelle et Joseph LOPEZ sont fiers de se mettre aux fourneaux chaque jour. Ce gage de qualité reconnu au « fait maison » crée de petites merveilles qui font le plaisir des gourmands de biscuits montécaos.
                        <br/>
                        <br/>
                        Le tour  de main reste chez nous une priorité, un savoir-faire qui se transmet de génération en génération dans la famille LOPEZ. 

                        </p>
                        </div>
                    </div>
                </div>
                
                <div>
                    
                </div>
            </div>
        </div>

    )
}

export default Accueil
