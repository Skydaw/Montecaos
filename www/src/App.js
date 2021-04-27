import './sass/App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Accueil from './pages/Accueil'
import Biscuits from './pages/Biscuits'
import Actualite from './pages/Actualite'
import Boutique from './pages/Boutique'
import Compte  from './pages/Compte'
import Panier from './pages/Panier'
import Cgv from './pages/Cgv';
import Mention from './pages/Mention';
import Politique from './pages/Politique';
import Contact from './pages/Contact';


import { useEffect, useMemo, useState } from 'react';
import { UserContext } from './js/UserContext';
import axios from 'axios';
import paiement from './pages/Paiement';
import AdminPanel from './pages/AdminPanel';


function App() {
  
  const [user,setUser]=useState(null)
  
  
  useEffect(()=>{
    (
      async () => {
        await axios({
          method: 'GET',
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
                url:'http://localhost:5000/api/user/'
            })
            .then((response)=>{
              const content =  response.data;
              if(content._id){
                setUser(content);
              }
            }).catch((err)=>{
              console.log(err)
            })
          }
          )()
        }, [])
        
        const value = useMemo(()=> ({user,setUser}),[user,setUser])

        return (
          <div className="App">

      <UserContext.Provider value={value}>
      <BrowserRouter >



      <Navbar/>
      <main>
        <Switch>
          <Route path="/" exact component={Accueil}/> 
          <Route path="/biscuits" exact  component={Biscuits}/>
          <Route path="/actualite" exact component={Actualite}/>
          <Route path="/boutique" sensitive  component={Boutique}/>
          <Route path="/compte" exact strict component={Compte}/>
          <Route path="/panier"exact component={Panier}/>
          <Route path="/contact" exact component={Contact}/>
          <Route path="/conditions-generales-de-vente" exact component={Cgv}/>
          <Route path="/mentions-legales" exact component={Mention}/>
          <Route path="/politique-de-confidentialite" exact component={Politique}/>
          <Route path='/Paiement'exact component={paiement}/>
          <Route path="/Admin" exact component={AdminPanel}/>
        </Switch>
      </main>
      <Footer/>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
