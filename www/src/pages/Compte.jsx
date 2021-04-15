import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from '../components/user/User'
import Register from '../components/user/Register'
import Login from '../components/user/Login'
import ModifUser from '../components/user/ModifUser'
import { UserContext } from '../js/UserContext'


const Compte = () => {
    const{user}=useContext(UserContext)
    return (
        <div>
            <h1>Mon compte</h1>
            
                    {!user?(
            <Router>
                <Switch>
                    <Route name='se connecter a un compte' exact path='/compte'>
                        <Login/>
                    </Route>
                    <Route name='creer un compte'path='/compte/register'>
                        <Register/>
                    </Route >
                    </Switch>
            </Router>
                    ):(
                        <Router>
                <div>connected</div>
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
