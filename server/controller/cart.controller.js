const cartRepository = require('../Repository/cart.repository')
const Cart = require("../models/cart.model");
    

exports.addItemToCart = async (req, res) => {
    const userid =req.body.userid
    const _id =req.body._id
    const productName = req.body.name
    const quantity = req.body.quantity;
    const price = req.body.price
    console.log(req.body)

    try {
        getcart = async () => {
            const carts = await Cart.find({"userid":userid}).populate({
                path: "productId",
                select: "name price total"
            });;

            return carts[0];
        };
        let cart = await getcart();
        console.log(cart)

        //Verifie si le chariot existe
        if (cart) {
            
            //verifier si l'item est present dans le chariot
            const indexFound = cart.items.findIndex(item => item.productId==_id);
            //Methode pour enleve l'item si la quantité descend a 0
            if (indexFound !== -1 && quantity <= 0) {
                cart.items.splice(indexFound, 1);
                if (cart.items.length == 0) {
                    cart.subTotal = 0;
                } else {
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
            }
        //    verifie si le produit existe et si oui ajuste le prix et la quantité
            else if (indexFound !== -1) {

                cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                cart.items[indexFound].price = price
                cart.items[indexFound].total = cart.items[indexFound].quantity * price;
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }
            //verifie si la quantité est superieur a 0
            else if (quantity > 0) {

                    cart.items.push({
                    productId: _id,
                    productName:productName,
                    quantity: quantity,
                    price: price,
                    total: price * quantity
                })  
                
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => 0 + acc + next);
            }

        
            //si la quantité est egale a 0 envoie une erreur
            else {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Invalid request"
                })
            }
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Process successful",
                data: data
            })
        }
        //creer un nouveau chariot puis ajoute l'item
        else {
            const cartData = {
                userid:userid,
                items: [{
                    productId: _id,
                    productName:productName,
                    price: price,
                    quantity: quantity,
                    total: price * quantity,
                }], 
                subTotal: price * quantity
            }
            cart = await cartRepository.addItem(cartData)
            
            // enregistre le chariot
            res.json(cart);
        }
    } catch (err) {
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
// recupere le chariot
exports.getCart = async (req, res) => {

    try {
        const userid =req.params.userid

        getcart = async () => {
            const carts = await Cart.find({"userid":userid}).populate({
                path: "productId",
                select: "name price total"
            });;
            return carts[0];
        };



        let cart = await getcart()
        if (!cart) {
            return res.status(400).json({
                type: "Invalid",
                msg: "Cart not Found",
            })
        }
        console.log(cart)
        res.status(200).json({
            status: true,   
            data: cart
        })
         
    } catch (err) {
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
// vider le chariot
exports.emptyCart = async (req, res) => {
    try {
        const userid =req.params.userid

        getcart = async () => {
            const carts = await Cart.find({"userid":userid}).populate({
                path: "items.productId",
                select: "name price total"
            });;
            return carts[0];
        };
            
        let cart = await getcart()
        cart.items = [];
        cart.subTotal = 0
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            mgs: "Cart has been emptied",
            data: data
        })
    } catch (err) {
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}