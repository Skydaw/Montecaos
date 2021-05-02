const Order = require("../models/order.model");
const id = process.env.id


exports.postOrder = async (req,res)=>{
    const productId= req.body.data 
    const userid =req.body.data.userid

    const subTotal= req.body.data.subTotal
    try{
        addItem = async payload => {
        const newOrder = await Order.create(payload);
        return newOrder
        }
        

        const orderData =({
            userid:userid,
            items: req.body.data.items,
            subTotal: subTotal
        }
        )            
        
        order = await addItem(orderData)
        console.log(req.body.data.items)


        res.json(order);
        }catch (err) {
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })

        }
}
exports.getOrder = async (req,res)=>{
    const userid=req.query.userid
        if(userid===id){

            const orders = await Order.find()

            res.send(orders)      

             

    }else{
            res.json('error')
   } 
}


exports.getOrderUser = async (req, res) => {
    try {
       const order = await Order.find({userid:req.params.userid})
       console.log(order)
       res.json(order)
       

    } catch (error) {
        console.warn(error)
        res.json({message: error.message})
    }
}