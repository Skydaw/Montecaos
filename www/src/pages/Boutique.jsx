import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductAll from '../components/produit/ProductAll'
import ModifProduct from '../components/admin/ModifProduct'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import CreerArticle from '../components/admin/CreerProduit';
import Product from '../components/produit/Product';


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
        <div className='boutique'>
            <h1>Boutique</h1>
            <Router>
            <Switch>
            <Route path="/boutique" exact>
                  <ProductAll  product={product} />
                </Route>
                <Route name="Single" exact path="/boutique/:producturl">
                  <Product/>
                </Route>



            </Switch>
            </Router>
        </div>
    )
}

export default Boutique
