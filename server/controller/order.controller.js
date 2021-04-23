const Order = require("../models/order.model");


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
    try{
        
        const userid = req.params.userid
        getOrderDb = async ()=>{
            const orders = await Order.find({"userid":userid}).populate({
                path: "items.productId",
                select: "name price total"
            });;
            return orders
        }

        let order = await getOrderDb()
        if(!order) {
            return res.staus(400).json({
                type:"Invalid",
                msg:"no order find"
            })
        }
        res.status(200).json({
            status: true,   
            data: orders
        })
         
    } catch (err) {
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
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