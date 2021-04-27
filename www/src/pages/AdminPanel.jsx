import React, { useContext, useEffect, useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Choose from '../components/admin/Choose';
import Commandes from '../components/admin/Commandes';
import CreerArticle from '../components/admin/CreerArticle';
import CreerProduit from '../components/admin/CreerProduit';
import ListArticle from '../components/admin/ListArticle';
import ListProduct from '../components/admin/ListProduct';
import Modifarticle from '../components/admin/Modifarticle';
import ModifProduct from '../components/admin/ModifProduct';
import Article from '../components/article/Article';
import { UserContext } from '../js/UserContext'


const AdminPanel = () => {
    const{user}=useContext(UserContext)
    const[role,setRole]=useState(false)


    if(user&&role==false){
        setRole(user.role)
    }
    if(role==='Admin'){
        return (
            <div className='admin'>
                <h1>Admin</h1>
                    <Router>
                        <Switch>
                            <Route name='Create Article'path="/admin/actualite/creer-article">
                                <Link to='/admin/actualite'>← Retour a la liste</Link>
                                <CreerArticle/>
                            </Route>
                            <Route name="modification" path='/admin/actualite/modifier/:titleurl'>
                                <Link to='/admin/actualite'>← Retour a la liste</Link>
                                <Modifarticle/>
                            </Route> 
                            <Route name="article" path='admin/actualite/:titleurl'>
                                <Article/>
                            </Route>
                            <Route name="Liste Article" path="/admin/actualite">
                                <Link to='/admin'>← Retour aux categories</Link>

                                <div className='btn-create'><Link to='/admin/actualite/creer-article'>Creer un nouvelle article</Link>  </div>
                                <ListArticle/>
                            </Route>
                            <Route name='Create Produit'path="/admin/product/creer-produit">
                                <CreerProduit/>
                            </Route>
                            <Route name="modification" path='/admin/product/modifier/:titleurl'>
                                <ModifProduct/>
                            </Route> 
                            <Route name="Liste Produit" path="/admin/product">
                            <div className='btn-create'><Link to='/admin/product/creer-produit'>Creer un nouveau produit</Link>  </div>

                                <ListProduct/>
                            </Route>
                            <Route name="Liste Commande" path="/admin/commande">
                                <Commandes/>
                            </Route>
                            <Route name="Route" exact path="/Admin">
                                <Choose></Choose>
                            </Route>
    
    
    
                        </Switch>
                    </Router>
    
    
    
                
        
                <div className='bottom'></div>
            </div>
        )
    }else{
        return<Redirect to ='/compte'/>

    }
    
}

export default AdminPanel
