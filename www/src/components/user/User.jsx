import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../js/UserContext';

const User = () => {



    const{user,setUser}=useContext(UserContext)

    async function eatCookie(){
        await axios(
           { method: 'POST',
            headers: {'Content-Type': 'application/json'},
            withCredentials: true,
            url:'http://localhost:5000/api/user/logout'}
        );
        setUser(null)
        }

        
    

    return (
        <div>
            <h2> bonjour {user.prenom} </h2>
            <div>
                <button onClick={eatCookie}>deconnecter</button>
              <Link to='/compte/user/modifier'>modifier</Link>
            </div>
        </div>
    )
}

export default User
