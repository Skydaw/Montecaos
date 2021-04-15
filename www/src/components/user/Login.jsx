  
import React, {useState,useContext} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { UserContext } from '../../js/UserContext'


const Login = () => {
    // eslint-disable-next-line no-unused-vars
    const{user,setUser}=useContext(UserContext)
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[redirect,setRedirect]=useState("")


    const submit=async(e)=>{
        e.preventDefault();
        console.log('yop')
        await fetch('http://localhost:5000/api/user/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},    
            credentials:'include',
            body:JSON.stringify({
                email,
                password
            })
        })


        const response = await fetch('http://localhost:5000/api/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
        const content = await response.json();
        if(content._id){
            setUser(content);
        }

    }
    if(redirect){
    return <Redirect to="/compte"/>
    }
    return (
        <div>

            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Se connecter</h1>
                    <input type="email" className="form-control" required  placeholder="name@example.com"value={email}
                    onChange={e=>setEmail(e.target.value)}
                    />
                    <input type="password" className="form-control" required placeholder="Password"value={password}
                    onChange={e=>setPassword(e.target.value)}
                    />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
            <p>Pas de compte? <Link to='/compte/register'>Creer en un!</Link></p>                
        </div>
    )
}

export default Login