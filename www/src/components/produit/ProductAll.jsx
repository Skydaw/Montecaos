import axios from 'axios';
import { useContext } from 'react';
import{Link} from'react-router-dom'
import { UserContext } from '../../js/UserContext'









const ProductAll = ({product}) => {
    const{user}=useContext(UserContext);



    const url = "http://localhost:5000/api/shop";
    
    

    
    
    return(
        <div className='list-item'>    

        
        {product.map((p,i) => {

            const { _id, producturl, name, price, img} = p;

            const imgName= img.substr(37)
            async function del() {
                const imgUrl =`${url}/image/${imgName}`;
                 const productUrl=`${url}/${producturl}`;
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
                    removeClass.classList.add(' hide')
                })
            }
             function addCart(){
                if(!user){
                    document.location.href="http://localhost:3000/compte"
                }else{
                    const userid=`${user._id}`
                    const urlCart = `http://localhost:5000/api/cart/`
                    try{
                        axios.post(urlCart,{
                            userid, 
                            _id,
                            name,
                            price,
                            quantity:1,
                        }).then(
                            direct()
                        )
                    }catch(error){
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                }
                }
                function go(){
                    addCart()

                }
                async function direct(){
                    // eslint-disable-next-line no-implied-eval
                    setTimeout('window.location="http://localhost:3000/panier";'
                    ,100)
                }
            
            return (
                
            <div className='container'>

                <div className="item"key={_id} >
                    <Link className="item-link" to={`boutique/${producturl}`}>

                        <img className="img" alt='Ilustration article Blog' src={img}></img>
                        <h2  className="item-name">{name}</h2>

                        <p  className="item-price">{price}€</p>
                        voir plus
                    <div className='btn' onClick= {go} >Ajouter au panier</div>
                    </Link> 
                    
                </div>

                <Link  to={`boutique/modifier/${producturl}`}>Modifier</Link>
                <button  onClick={verif}>Suprimmer l'article</button>
                <p className={`delmethod${producturl} hide`}>Êtes-vous sûrs ?</p>
                <button className={`delmethod${producturl} hide`} onClick={del}>Oui</button>
                <button  className={`delmethod${producturl} hide`} onClick={hide}>Non</button>
            </div>

        )
        })}
        </div>
    )    
}

export default ProductAll