import React, { useState } from 'react'
import { NavLink , Link} from 'react-router-dom'


const Navbar = () => {


  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);



    return (  
        <nav className="navbar">
          <div className='mobileNav'>
            <div  className='nav-icon-mobile burger'>
              <i onClick={handleClick} className ={click ? 'fas fa-times':"fas fa-bars "}></i>
            </div>
            <Link className="nav-logo-mobile" to="/"onClick={closeMobileMenu} ><img src="../images/logo.png" alt="" / ></Link>     
            <Link className="nav-icon-mobile" to="/panier"onClick={closeMobileMenu}><i className="fas fa-shopping-cart"></i></Link>
          </div>
          <ul className=  {click ? "  actived navbar-ul" : " navbar-ul"}>
            <li className="nav-item">
              <div>
              <NavLink className="nav-link" to="/"onClick={closeMobileMenu} >Accueil</NavLink>
            </div>
            </li>
            <li className="nav-item">
              <div>
                <NavLink className="nav-link" to="/biscuits"onClick={closeMobileMenu} >Nos biscuits</NavLink>
                </div>
            </li>
            <li className="nav-item">
              <div>
              <NavLink className="nav-link" to="/actualite"onClick={closeMobileMenu}>Actualité</NavLink>
              </div>
            </li>
            <li className="nav-item logo">
              <Link className="nav-link" to="/"><img src="../images/logo.png" alt=""/></Link>
            </li>
            <li className="nav-item">
              <div>
              <NavLink className="nav-link" to="/boutique"onClick={closeMobileMenu}>Boutique</NavLink>
              </div>
            </li>
            <li className="nav-item">
              <div>
                <NavLink className="nav-link" to="/compte"onClick={closeMobileMenu}>Mon compte</NavLink>
                </div>
            </li>
            <li className="nav-item">
              <div>
                <NavLink className="nav-link" to="/panier"onClick={closeMobileMenu}>Panier</NavLink>
                </div>
            </li>
          </ul>


          
      </nav>
    )
}

export default Navbar
