import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../js/UserContext';

const User = () => {
    document.title="Mon compte - Montecaos";



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
        <>
              <Link className='btn'  to='/compte/user/modifier'>Modifier votre profil</Link>

              <Link className='btn' to={{
                  pathname:'/compte/user/facture',
                  state:{userid:user.userid}
                }}>Vos commandes</Link>
                <div className='disconect' onClick={eatCookie}>deconnecter</div>
                <div className='bottom'></div>
        </>
    )
}

export default User
