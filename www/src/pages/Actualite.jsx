import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Articleall from '../components/article/Articleall'
import Article from '../components/article/Article'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



const Actualite = () => {
  document.title="Actualité - Montecaos ";

  
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

                <Route name="Single" path="/actualite/:titleurl">
                  <Article/>
                </Route>
                <Route path="/actualite" exact>
                  <Articleall  blog={blog} />
                </Route>


            </Switch>
            </Router>
        </div>
    )
}

export default Actualite
