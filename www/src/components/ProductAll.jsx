import axios from 'axios';
import{Link} from'react-router-dom'







const ProductAll = ({product}) => {
    
    const url = "http://localhost:5000/api/shop";
    
    
    
    return(
        <>    
        {product.map((p,i) => {
            const { _id, producturl, name, description, price, img} = p;
            const imgName= img.substr(37)
            async function del() {
                const imgUrl =`${url}/image/${imgName}`;
                console.log(imgUrl)
                 const productUrl=`${url}/${producturl}`;
                 console.log(producturl)
                try {
                    const ris =await axios.delete(imgUrl);
                    const res =await axios.delete(productUrl);
                    console.log(ris)
                    console.log(res)
                    window.location.href = 'http://localhost:3000/boutique'
                    
        
                } catch (error) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            }
            function verif(){
                const clss =`.delmethod${producturl}`
                const objet = document.querySelectorAll(clss)
                objet.forEach(function(removeClass){
                    removeClass.classList.remove('hide')
                })
            }
            function hide(){
                const clss =`.delmethod${producturl}`
                const objet = document.querySelectorAll(clss)
                objet.forEach(function(removeClass){
                    removeClass.classList.add('hide')
                })
            }

            return (
                <div key={_id}>
                <Link to={`boutique/${producturl}`}>
                    voir plus
                </Link> 
                <div className="article" key={_id} >
                    <img className="img" alt='Ilustration article Blog' src={img}></img>
                    <h2  className="title-article">{name}</h2>
                    <pre  className="content-article" >{description}...</pre>
                    <p  className="tags-article">{price}</p>
                    <Link  to={`boutique/modifier/${producturl}`}>Modifier</Link>
                    <button  onClick={verif}>Suprimmer l'article</button>
                    <p className={`delmethod${producturl} hide`}>Êtes-vous sûrs ?</p>
                    <button className={`delmethod${producturl} hide`} onClick={del}>Oui</button>
                    <button  className={`delmethod${producturl} hide`} onClick={hide}>Non</button>

                    
                </div>
                </div>
        )
        })}
        </>
    )    
}

export default ProductAll