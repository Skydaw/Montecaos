import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { UserContext } from '../../js/UserContext'

const ModifUser = () => {

    const{user}=useContext(UserContext)


    const[nom,setNom]=useState("")
    const[prenom,setPrenom]=useState("")
    const[datenaissance,setDatenaissance]=useState("")
    const[email,setEmail]=useState("")
    const[adresse,setAdresse]=useState("")
    const[complement,setComplement]=useState("")
    const[ville,setVille]=useState("")
    const[codepostal,setCodepostal]=useState("")
    const[pays,setPays]=useState("")
    const[telephone,setTelephone]=useState("")
    const[redirect,setRedirect]=useState(false)

    async function uploadData() {

        try {
            const url= `http://localhost:5000/api/user/modifier/${user._id}`
            await axios.put(url,{
                    nom:nom,
                    prenom:prenom,
                    email:email,
                    datenaissance:datenaissance,
                    adresse:adresse,
                    complement:complement,
                    ville:ville,
                    codepostal:codepostal,
                    pays:pays,
                    telephone:telephone

            });
            setRedirect(true)

            

        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }

    useEffect(()=>{
        setNom(user.nom)
        setPrenom(user.prenom)
        setDatenaissance(user.datenaissance)
        setEmail(user.email)
        setAdresse(user.adresse)
        setComplement(user.complement)
        setVille(user.ville)
        setCodepostal(user.codepostal)
        setPays(user.pays)
        setTelephone(user.telephone)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(redirect){
    return <Redirect to="/compte"/>
    }
    return (
        <div className='user-change'>
            <div className='label'>Nom</div>
            <input type="text" className="form-control"required placeholder="Nom"id='name-input'value={nom}
            onChange={e=>setNom(e.target.value)}
            />
             <div className='label'>Prénom</div>
            <input type="text" className="form-control"required placeholder="Prenom"id='lastname-input'value={prenom}
            onChange={e=>setPrenom(e.target.value)}
            />
             <div className='label'>Date de naissance</div>
            <input type="text" className="form-control"required placeholder="Date de naissance"id='birthday-input'value={datenaissance}
            onChange={e=>setDatenaissance(e.target.value)}
            />
             <div className='label'>Email</div>
            <input type="email" className="form-control" required  placeholder="name@example.com"value={email}
            onChange={e=>setEmail(e.target.value)}
            /> 
            <div className='label'>Adresse</div> 
            <input type="text" className="form-control"required placeholder="adresse"id='adress-input'value={adresse}
            onChange={e=>setAdresse(e.target.value)}
            />
             <div className='label'>Complement d'adresse(facultatif)</div>
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
            <div className='label'>Téléphone</div>
            <input type="text" className="form-control"required placeholder="telephone"id='telephone-input'value={telephone}
            onChange={e=>setTelephone(e.target.value)}
            />
            <button className='btn' onClick={uploadData}>Sauvegarder les modifications</button>

        </div>
    )
}

export default ModifUser
