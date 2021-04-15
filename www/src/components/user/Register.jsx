  
import React ,{ useState } from 'react'
import {Redirect} from 'react-router-dom'


const Register = () => {

    const[nom,setNom]=useState("")
    const[prenom,setPrenom]=useState("")
    const[datenaissance,setDatenaissance]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[adresse,setAdresse]=useState("")
    const[complement,setComplement]=useState("")
    const[ville,setVille]=useState("")
    const[codepostal,setCodepostal]=useState("")
    const[pays,setPays]=useState("")
    const[telephone,setTelephone]=useState("")
    const[redirect,setRedirect]=useState("")

    const submit=async(e)=>{
        e.preventDefault();
        console.log('yo')
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
                telephone
            })
        })
        console.log('yo')

        setRedirect(true)
    
    }
    
    if(redirect){
    return <Redirect to="/compte"/>
    }
    return (
        <div>
            <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                <input type="text" className="form-control"required placeholder="Nom"id='name-input'value={nom}
                onChange={e=>setNom(e.target.value)}
                />
                <input type="text" className="form-control"required placeholder="Prenom"id='lastname-input'value={prenom}
                onChange={e=>setPrenom(e.target.value)}
                />
                <input type="text" className="form-control"required placeholder="Date de naissance"id='birthday-input'value={datenaissance}
                onChange={e=>setDatenaissance(e.target.value)}
                />
                <input type="email" className="form-control" required  placeholder="name@example.com"value={email}
                onChange={e=>setEmail(e.target.value)}
                />
                <input type="password" className="form-control" required placeholder="Password"value={password}
                onChange={e=>setPassword(e.target.value)}
                />
                <input type="text" className="form-control"required placeholder="adresse"id='adress-input'value={adresse}
                onChange={e=>setAdresse(e.target.value)}
                />
                <input type="text" className="form-control"required placeholder="complement d'adresse"id='adressplus-input'value={complement}
                onChange={e=>setComplement(e.target.value)}
                />
                <input type="text" className="form-control"required placeholder="ville"id='city-input'value={ville}
                onChange={e=>setVille(e.target.value)}
                />
                <input type="text" className="form-control"required placeholder="code postal"id='cedex-input'value={codepostal}
                onChange={e=>setCodepostal(e.target.value)}
                />
                <input type="text" className="form-control"required placeholder="pays"id='country-input'value={pays}
                onChange={e=>setPays(e.target.value)}
                />
                <input type="text" className="form-control"required placeholder="telephone"id='telephone-input'value={telephone}
                onChange={e=>setTelephone(e.target.value)}
                />

            <button className="w-100 btn btn-lg btn-primary" onClick={submit} type="submit">Register</button>
            </form>  
        </div>
    )
}

export default Register