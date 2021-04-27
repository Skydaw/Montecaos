import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Articleall from '../components/article/Articleall'
import Article from '../components/article/Article'
import Modifarticle from '../components/admin/Modifarticle'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import CreerArticle from '../components/admin/CreerArticle';



const Actualite = () => {
  
  const [blog,setBlog] = useState([]);
  const url ='http://localhost:5000/api/blog'
    async function getPosts() {
      try {
        const res = await axios.get(url);
        setBlog(res.data);
  
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(()=>{
      getPosts()    
    },[])



    return (
        <div className='actualité'>
            <h1>Actualité</h1>
            <Router>

            <Switch>
                {/* <Route name="creer" path='/actualite/creer-article'>
                  <CreerArticle/>
                </Route>
                <Route name="modification" path='/actualite/modifier/:titleurl'>
                  <Modifarticle/>
                </Route> */}
                <Route name="Single" path="/actualite/:titleurl">
                  <Article/>
                </Route>
                <Route path="/actualite" exact>
                  {/* <NavLink to='/actualite/creer-article'>Creer un article</NavLink> */}

                  <Articleall  blog={blog} />
                </Route>


            </Switch>
            </Router>
        </div>
    )
}

export default Actualite
