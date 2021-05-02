const multer = require('multer')
const GridFsStorage = require("multer-gridfs-storage"); 
const crypto = require("crypto");
const mongoose = require('mongoose')
const Grid = require("gridfs-stream");
const cors = require('cors')
const bodyParser = require('body-parser')
const path =require("path")
const id = process.env.id



const mongoURI =process.env.MONGO_URL;

const router = require("express").Router();

router.use(cors())
router.use(bodyParser.json());
// appel du model
const Product = require('../models/product.model');


// logique et post image
const conn = mongoose.createConnection(mongoURI);
let gfs;
   conn.once("open", () => {
     gfs = Grid(conn.db, mongoose.mongo);
     gfs.collection("shopUpload");
     console.log("Connection Successful");
   }); 

   // Create storage engine
let storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise(
        (resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: "shopUpload"
          };
          resolve(fileInfo);
        });
      });
    }
  });
  // setup multer
   const upload = multer({ storage });

  router.post("/image", upload.single("img"), (req, res,) => {
     res.json({file:req.file})
      res.json('error')
    
   });
//    get img
router.get("/image/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists"
        });
      }
  
      // Check if image
      if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
        // display image
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image"
        });
      }
    });
  });
  // delete image
  router.delete('/image/:filename', (req,res) =>{
    const rid = req.query.userid
    if(rid===id){
      gfs.remove({filename: req.params.filename , root:'shopUpload'},(err)=>{
        if(err){
          return res.status(404).json({err:err})
        }
        res.json({message:'suppression effectuée '})
      })
    }else{
      res.json('error')
    }
})
// route post un nouvelle article
router.post ("/", async (req,res)=>{

  const _id = req.body.userid

  if(_id===id){

    
    const product = new Product({
      producturl:req.body.product.producturl,
      name: req.body.product.name,
      description: req.body.product.description,
      price: req.body.product.price,
      feature:req.body.product.feature,
      img:req.body.product.img,
      order:req.body.product.order
      
    }) 
   await product.save()
   .then((result)=>{
     console.log(result)
     res.send(result);
    }).catch((err)=> next(err))
  }else{
    res.json('error')
  }

 });

// route for all post
router.get('/',async (req, res) => {
    try {
        const product = await Product.find()
        res.send(product)      
    } catch (error) {
        console.warn(error)
        res.json({message: error.message})
    }
})

   // route for single post

router.get('/:producturl',async (req, res) => {
 
    try {
       const product = await Product.findOne({producturl:req.params.producturl})
       res.json(product)

    } catch (error) {
        console.warn(error)
        res.json({message: error.message})
    }
  
})

router.put('/:producturl',async (req,res) =>{
  const rid = req.body.userid

  if(rid===id){

  
    Product.findOne({producturl:req.params.producturl},function(err, product){
        if (err){
            res.send(err)
        }
        else{
                
            product.name=req.body.product.name;
            product.description=req.body.product.description;
            product.price=req.body.product.price;
            product.feature=req.body.product.feature;
            product.order=req.body.product.order

            product.save(function(err){
                    if(err){
                    res.send
                    }
                    else{
                        res.json({message:'Mise à jour effectuée'})
                    }
                })
            }
            
    })
  }else{
    res.json({message:'Error'})

  }
})
router.delete('/:producturl',async (req,res) =>{
  const rid = req.query.userid
  if(rid===id){


    Product.remove({producturl:req.params.producturl},function(err, product){
        if (err){
            res.send(err)
        }
        else{   
            res.json({message:'suppression effectuée '})
        }
    })
  }else{
    res.json({message:'Error'})

  }
})

   
   
module.exports = router;