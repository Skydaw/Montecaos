import React, { useContext, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from '../components/user/User'
import Register from '../components/user/Register'
import Login from '../components/user/Login'
import ModifUser from '../components/user/ModifUser'
import { UserContext } from '../js/UserContext'
import Order from '../components/user/Order';


const Compte = () => {
    const{user}=useContext(UserContext)
    const from = window.document.referrer
    function check(){
        if(from ==='http://localhost:3000/boutique'){
            const objet = document.querySelectorAll(".clss")
            console.log('yo')
            objet.forEach(function(removeClass){
                removeClass.classList.remove('hide')
            } 
            )}}
useEffect(()=>{
    check()    
  },[])

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
                    </Switch>
            </Router>
                    ):(
                        <Router>
                <div className='user-div'>

                <Switch>
                    <Route name='mon compte' exact path='/compte/'>
                <h2>Bonjour{user.prenom} {user.nom}</h2>
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
