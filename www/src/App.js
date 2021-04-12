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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <main>
        <Switch>
        <Route path="/" exact component={Accueil}/>
        <Route path="/biscuits"  component={Biscuits}/>
        <Route path="/actualite"  component={Actualite}/>
        <Route path="/boutique"  component={Boutique}/>
        <Route path="/compte"  component={Compte}/>
        <Route path="/panier" component={Panier}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/conditions-generales-de-vente" component={Cgv}/>
        <Route path="/mentions-legales" component={Mention}/>
        <Route path="/politique-de-confidentialite" component={Politique}/>
        
        </Switch>
      </main>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;