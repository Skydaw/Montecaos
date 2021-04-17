import axios from 'axios';
import{Link } from'react-router-dom'







const Articleall = ({blog}) => {
    
    const url = "http://localhost:5000/api/blog";

    
    return(
        <>    
        {blog.map((p) => {
            const { _id, titleurl, title, body, date, img} = p;
            const imgName= img.substr(37)
            async function del() {
                const imgUrl =`${url}/image/${imgName}`;
                console.log(imgUrl)
                 const blogurl=`${url}/${titleurl}`;
                 console.log(blogurl)
                try {
                    const ris =await axios.delete(imgUrl);
                    const res =await axios.delete(blogurl);
                    console.log(ris)
                    console.log(res)
                    window.location.href = 'http://localhost:3000/actualite'
                    
        
                } catch (error) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            }
            function verif(){
                const clss =`.delmethod${titleurl}`
                const objet = document.querySelectorAll(clss)
                objet.forEach(function(removeClass){
                    removeClass.classList.remove('hide')
                })
            }
            function hide(){
                const clss =`.delmethod${titleurl}`
                const objet = document.querySelectorAll(clss)
                objet.forEach(function(removeClass){
                    removeClass.classList.add('hide')
                })
            }


            return (
                <div key={_id} >
                <Link to={`actualite/${titleurl}`}>
                    voir plus
                </Link> 
                <div className="article" >
                    <img className="img"  alt='Ilustration article Blog' src={img}></img>
                    <h2 className="title-article" >{title}</h2>
                    <pre className="content-article">{body}...</pre>
                    <p className="tags-article">{date}</p>
                    <Link to={`actualite/modifier/${titleurl}`}>Modifier</Link>
                    <button onClick={verif}>Suprimmer l'article</button>
                    <p  className={`delmethod${titleurl} hide`}>Êtes-vous sûrs ?</p>
                    <button  className={`delmethod${titleurl} hide`} onClick={del}>Oui</button>
                    <button  className={`delmethod${titleurl} hide`} onClick={hide}>Non</button>

                    
                </div>
                </div>
        )
        })}
        </>
    )    
}

export default Articleall