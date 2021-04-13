import{Link} from'react-router-dom'





const Articleall = ({blog}) => {

    return(
        <>
        
        {blog.map((p) => {
            const { id, titleurl, title, body, date, img} = p;


            return (
                <>
                <Link to={`actualite/${titleurl}`}>
                    voir plus
                </Link> 
                <div className="article" key={id} >
                    <img className="img" alt='Ilustration article Blog' src={img}></img>
                    <h2 className="title-article">{title}</h2>
                    <p className="content-article">{body}...</p>
                    <p className="tags-article">{date}</p>
                <Link to={`actualite/modifier/${titleurl}`}>Modifier</Link>
                </div>
                </>
        )
        })}
        </>
    )    
}

export default Articleall