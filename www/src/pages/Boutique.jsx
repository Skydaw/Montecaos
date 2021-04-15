import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductAll from '../components/produit/ProductAll'
import ModifProduct from './ModifProduct'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import CreerArticle from '../components/produit/CreerProduit';
import Product from './Product';


const url ='http://localhost:5000/api/shop'

const Boutique = () => {
    const [product,setProduct] = useState([]);
  
    async function getPosts() {
      try {
        const res = await axios.get(url);
        setProduct(res.data);
  
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(()=>{
      getPosts()    
    },[])



    return (
        <div>
            <h1>Boutique</h1>
            <Router>

            <Switch>
                <Route name="creer" exact path='/boutique/creer-article'>
                  <CreerArticle/>
                </Route>
                <Route name="modification" exact path='/boutique/modifier/:producturl'>
                  <ModifProduct/>
                </Route>
                <Route name="Single" exact path="/boutique/:producturl">
                  <Product/>
                </Route>
                <Route path="/boutique" exact>
                  <NavLink to='/boutique/creer-article'>Creer un produit</NavLink>
                  <br/>
                  <ProductAll  product={product} />
                </Route>


            </Switch>
            </Router>
        </div>
    )
}

export default Boutique
