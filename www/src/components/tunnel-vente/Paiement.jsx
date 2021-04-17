import React, { useEffect, useState } from 'react'
import Bouton from './Bouton'

const Paiement = () => {

    const [showPaypal,setShowPaypal]=useState("");
    
      const showPaypalButtons = () => {
       setShowPaypal(true);
      };
      useEffect(()=>{
        setShowPaypal(false)
      },[])
    
    if (showPaypal) {
      return <Bouton />;
    } else {
    return (
        <div>
            aaa
            <button onClick={showPaypalButtons}> Pay </button>
        </div>
    )
}
}

export default Paiement
