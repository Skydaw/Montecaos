import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Articleall from '../components/Articleall'
import Article from './Article'
import Modifarticle from './Modifarticle'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const url ='http://localhost:5000/api/blog'

const Actualite = () => {
    const [blog,setBlog] = useState([]);
  
    async function getPosts() {
      try {
        const res = await axios.get(url);
        setBlog(res.data);
        console.log(res.data)
  
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(()=>{
      getPosts()    
    },[])



    return (
        <div>
            <h1>Actualité</h1>
            <Router>

            <Switch>
                <Route name="modification" path='/actualite/modifier/:titleurl'>
                    <Modifarticle/>
                </Route>
                <Route name="Single" path="/actualite/:titleurl">
                    <Article/>
                </Route>
                <Route key='/actualite' path="/actualite" exact>
                <Articleall  blog={blog} />
                </Route>


            </Switch>
            </Router>
        </div>
    )
}

export default Actualite
