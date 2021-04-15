const multer = require('multer')
const GridFsStorage = require("multer-gridfs-storage"); 
const crypto = require("crypto");
const mongoose = require('mongoose')
const Grid = require("gridfs-stream");
const cors = require('cors')
const bodyParser = require('body-parser')
const path =require("path")


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
      gfs.remove({filename: req.params.filename , root:'shopUpload'},(err)=>{
        if(err){
          return res.status(404).json({err:err})
        }
        res.json({message:'suppression effectuée '})
      })
    
})
// route post un nouvelle article
router.post ("/", async (req,res)=>{

  const product = new Product({
      producturl:req.body.producturl,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      feature:req.body.feature,
      img:req.body.img,
      
  }) 
   await product.save()
      .then((result)=>{
      res.send(result);
  }).catch((err)=> next(err))

 });

// route for all post
router.get('/',async (req, res) => {
    try {
        const product = await Product.find()
        res.json(product)
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
    Product.findOne({producturl:req.params.producturl},function(err, product){
        if (err){
            res.send(err)
        }
        else{
                
            product.name=req.body.name;
            product.description=req.body.description;
            product.price=req.body.price;
            product.feature=req.body.feature;
            product.save(function(err){
                    if(err){
                    res.send
                    }
                    else{
                        res.json({message:'Mise a jour effectuée'})
                    }
                })
            }
            
    })

})
router.delete('/:producturl',async (req,res) =>{
    Product.remove({producturl:req.params.producturl},function(err, product){
        if (err){
            res.send(err)
        }
        else{   
            res.json({message:'suppression effectuée '})
        }
    })
})

   
   
module.exports = router;