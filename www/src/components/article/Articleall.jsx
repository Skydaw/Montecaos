import{Link } from'react-router-dom'







const Articleall = ({blog}) => {
     document.title="Actualité - Montecaos ";

     
    
    return(
        <div className='All-article'>    
        {blog.map((p) => {
            const { _id, titleurl, title, body, createdAt, img} = p;
            let monthLt=''
            const monthNb = createdAt.substr(5,2)
            if(monthNb ==='01'){
                 monthLt='janvier'
            }
            if(monthNb ==='02'){
                 monthLt='fevrier'
            }
            if(monthNb ==='03'){
                 monthLt='mars'
            }
            if(monthNb ==='04'){
                 monthLt='avril'
            }
            if(monthNb ==='05'){
                 monthLt='mai'
            }
            if(monthNb ==='06'){
                 monthLt='juin'
            }
            if(monthNb ==='07'){
                 monthLt='juillet'
            }
            if(monthNb ==='08'){
                 monthLt='aout'
            }
            if(monthNb ==='09'){
                 monthLt='septembre'
            }
            if(monthNb ==='10'){
                 monthLt='octobre'
            }
            if(monthNb ==='11'){
                 monthLt='nomvembre'
            }
            if(monthNb ==='12'){
                 monthLt='decembre'
            }
         
           


            return (
                <>
                <div className="article" key={_id}  >
                    <div className='corps'>
                        <div className='img-date'>
                            <div className="date-article">{createdAt.substr(8,2)} {monthLt} {createdAt.substr(0,4)}</div>
                            <img className="img"  alt='Ilustration article Blog' src={img}></img>
                        </div>
                        <div>
                            <h2 className="title-article" >{title}</h2>
                            <div className="content-article">{body.substring(0,150)}...</div>
                            <Link to={`actualite/${titleurl}`}>
                                voir plus
                            </Link> 
                        </div>

                    </div>

                   
                </div>
                </>
        )
        })}
        </div>
    )    
}

export default Articleall