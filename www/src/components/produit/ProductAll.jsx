import axios from 'axios';
import { useContext } from 'react';
import{Link} from'react-router-dom'
import { UserContext } from '../../js/UserContext'









const ProductAll = ({product}) => {
    const{user}=useContext(UserContext);
    document.title="Boutique - Montecaos ";

    return(
        
        <div className='list-item'>    

        
        {product.map((p,i) => {

            const { _id, producturl, name, price, img,order} = p;

           
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
                
            <div className='container'style={{order:order}}>

                <div className="item"key={_id} >

                    <Link className="item-link" to={`boutique/${producturl}`}>
                        <img className="img" alt='Ilustration article Blog' src={img}></img>
                        <h2  className="item-name">{name}</h2>

                        <p  className="item-price">{price}€</p>
                        <p className="see-more">Voir plus →</p>
                    {/* <div className='btn' onClick= {go} >Ajouter au panier</div> */}
                    </Link> 
                    
                </div>

            </div>

        )
        })}
        </div>
    )    
}

export default ProductAll