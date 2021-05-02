import React, { useContext, useEffect, useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import User from '../components/user/User'
import Register from '../components/user/Register'
import Login from '../components/user/Login'
import ModifUser from '../components/user/ModifUser'
import { UserContext } from '../js/UserContext'
import Order from '../components/user/Order';
import CreatedAccount from '../components/user/CreatedAccount';


const Compte = () => {

    const{user}=useContext(UserContext)
    const[role,setRole]=useState(false)
    const from = window.document.referrer
    function check(){
        if(from ==='http://localhost:3000/boutique'){
            const objet = document.querySelectorAll(".clss")
            objet.forEach(function(removeClass){
                removeClass.classList.remove('hide')
            } 
            )}}
useEffect(()=>{
    check();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    if(user&&role===false){
        setRole(user.role)
    }
    if(role==='Admin'){
        return<Redirect to ='/Admin'/>
    }

    return (
        <div className='account'>
            <h1>Mon compte</h1>
            
                    {!user?(
            <Router>
                <Switch>
                    <Route name='se connecter a un compte' exact path='/compte'>
                        <h2 className='hide clss'>Veillez vous connecter pour ajouter au panier</h2>
                        <Login/>
                    </Route>
                    <Route name='creer un compte'path='/compte/register'>
                        <Register/>
                    </Route >
                    <Route name='compte creer' path='/compte/compte-creer'>
                        <CreatedAccount/>
                    </Route>
                       
                    </Switch>
            </Router>
                    ):(
                        
                        <Router>
                        
                        <div className='user-div'>
            
                         <Switch>
                            <Route name='mon compte' exact path='/compte/'>
                            <h2>Bonjour {user.prenom} {user.nom}</h2>
                
                            <User/>
                        </Route>
                        <Route name='Voir ses commandes' path='/compte/user/facture'>
                            <Order user={user}/>
                        </Route>
                        <Route name='modifier profil user' path='/compte/user/modifier'>
                            <ModifUser/>
                        </Route>
                    </Switch>
                    </div>
                </Router>
            )}
            <div className='bottom'></div>
        </div>
    )
}

export default Compte
