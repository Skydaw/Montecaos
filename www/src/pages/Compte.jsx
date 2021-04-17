import React, { useContext, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from '../components/user/User'
import Register from '../components/user/Register'
import Login from '../components/user/Login'
import ModifUser from '../components/user/ModifUser'
import { UserContext } from '../js/UserContext'


const Compte = () => {
    const{user}=useContext(UserContext)
    const b = window.document.referrer
    console.log(b)
    function check(){
        if(b =='http://localhost:3000/boutique'){
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
        <div>
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
                <div>Bonjour{user.nom}</div>
                <Switch>
                    <Route name='mon compte' exact path='/compte/'>
                        <User/>
                    </Route>
                    <Route name='modifier profil user' path='/compte/user/modifier'>
                        <ModifUser/>
                    </Route>
                </Switch>
            </Router>
            
            )}
        </div>
    )
}

export default Compte
