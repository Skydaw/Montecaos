  
import React ,{ useEffect, useState } from 'react'
import {Redirect} from 'react-router-dom'


const Register = () => {
    document.title="S'enregistrer - Montecaos";



    const[nom,setNom]=useState("")
    const[prenom,setPrenom]=useState("")
    const[datenaissance,setDatenaissance]=useState("")
    const[email,setEmail]=useState("")
    const[email2,setEmail2]=useState("")
    const[password,setPassword]=useState("")
    const[password2,setPassword2]=useState("")

    const[adresse,setAdresse]=useState("")
    const[complement,setComplement]=useState("")
    const[ville,setVille]=useState("")
    const[codepostal,setCodepostal]=useState("")
    const[pays,setPays]=useState("")
    const[telephone,setTelephone]=useState("")
    const[redirect,setRedirect]=useState("")

    const submit=async(e)=>{
        e.preventDefault();
        if(nom.length === 0 ){
            window.alert("vous n'avez pas rentrer de nom")
        }else{
        if(prenom.length === 0 ){
            window.alert("vous n'avez pas rentrer de prenom")
        }else{
        if(datenaissance.length === 0 ){
            window.alert("vous n'avez pas rentrer de date de naissance")
        }else{
        if(adresse.length === 0 ){
            window.alert("vous n'avez pas rentrer votre adresse")
        }else{
        if(ville.length === 0 ){
            window.alert("vous n'avez pas rentrer votre ville")
        }else{
        if(codepostal.length === 0 ){
            window.alert("vous n'avez pas rentrer de code postal")
        }else{
        if(pays.length === 0 ){
            window.alert("vous n'avez pas rentrer de pays")
        }else{
        if(email.length === 0 ){
            window.alert("vous n'avez pas rentrer d'email")
        }else{
        if(password.length === 0 ){
            window.alert("vous n'avez pas rentrer de mot de passe")
        }else{
        

        

        if(email===email2){
        if(password===password2){

            await fetch('http://localhost:5000/api/user/register',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    nom,
                    prenom,
                    email,
                    password,
                    datenaissance,
                    adresse,
                    complement,
                    ville,
                    codepostal,
                    pays,
                    telephone,
            })
        }).then((resp)=>{
            
            console.log(resp)
        })    
       setRedirect(true)
    }else{
        window.alert('Les mots de passe ne correspondent pas')    }
    }else{
        window.alert('Les adresse mail ne correspondent pas')
    
    }
    }}}}}}}}}
    
    }
    useEffect(()=>{
    },[])
    
    if(redirect){
    return <Redirect to="/compte/compte-creer"/>
    }
    return (
        <>
        <div className='form-register'>
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Création du Compte</h1>
            <div className='container-form'>
                
            
                <div className='label'>Nom</div>
                <input type="text" className="form-control"required placeholder="Nom"id='name-input'value={nom}
                onChange={e=>setNom(e.target.value)}
                />
                <div className='label'>Prénom</div>
                <input type="text" className="form-control"required placeholder="Prenom"id='lastname-input'value={prenom}
                onChange={e=>setPrenom(e.target.value)}
                />
                <div className='label'>Date de naissance</div>
                <input type="date" className="form-control"required placeholder="Date de naissance"id='birthday-input'value={datenaissance}
                onChange={e=>setDatenaissance(e.target.value)}
                />
                <div className='label'>Email</div>
                <input type="email" className="form-control" required  placeholder="name@example.com"value={email}
                onChange={e=>setEmail(e.target.value)}
                />
                <div className='label'>Confirmer Email</div>
                <input type="email" className="form-control" required  placeholder="name@example.com"value={email2}
                onChange={e=>setEmail2(e.target.value)}
                />
                <div className='label'>Mot de passe<small>(8 caractères minimum)</small></div>
                <input type="password" className="form-control" required placeholder="Mot de passe" minlength='8'value={password}
                onChange={e=>setPassword(e.target.value)}
                />
                <div className='label'>Confirmer mot de passe</div>
                <input type="password" className="form-control" required placeholder="Mot de passe" minlength='8'value={password2}
                onChange={e=>setPassword2(e.target.value)}
                />

                <div className='label'>Adresse</div>
                <input type="text" className="form-control"required placeholder="Adresse"id='adress-input'value={adresse}
                onChange={e=>setAdresse(e.target.value)}
                />
                <div className='label'>Complement d'adresse <small>(facultatif)</small></div>
                <input type="text" className="form-control"required placeholder="complement d'adresse"id='adressplus-input'value={complement}
                onChange={e=>setComplement(e.target.value)}
                />
                <div className='label'>Ville</div>
                <input type="text" className="form-control"required placeholder="ville"id='city-input'value={ville}
                onChange={e=>setVille(e.target.value)}
                />
                <div className='label'>Code postal</div>
                <input type="text" className="form-control"required placeholder="code postal"id='cedex-input'value={codepostal}
                onChange={e=>setCodepostal(e.target.value)}
                />
                <div className='label'>Pays</div>
                <input type="text" className="form-control"required placeholder="pays"id='country-input'value={pays}
                onChange={e=>setPays(e.target.value)}
                />
                <div className='label'>Téléphone <small>(facultatif)</small></div>
                <input type="text" className="form-control" placeholder="telephone"id='telephone-input'value={telephone}
                onChange={e=>setTelephone(e.target.value)}
                />
                </div>

            <div className="btn" onClick={submit} type="submit">Enregistrement</div>
            </form>  
        </div>
        <div className='bottom'></div>
        </>
    )
}

export default Register