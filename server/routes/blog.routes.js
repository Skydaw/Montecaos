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
const Blog = require('../models/blog.model');


// logique et post image
const conn = mongoose.createConnection(mongoURI);
let gfs;
   conn.once("open", () => {
     gfs = Grid(conn.db, mongoose.mongo);
     gfs.collection("uploads");
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
            bucketName: "uploads"
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
    const rid = req.query.userid
    if(rid===id){
      gfs.remove({filename: req.params.filename , root:'uploads'},(err)=>{
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
  console.log(req.body)
  const rid = req.body.userid

  if(rid===id){

  const blog = new Blog({
      titleurl:req.body.post.titleurl,
      title: req.body.post.title,
      body: req.body.post.body,
      date: req.body.post.date,
      img:req.body.post.img,
      
  }) 
   await blog.save()
      .then((result)=>{
      res.send(result);
  }).catch((err)=> next(err))
  }else{
    res.json('error')

  }
 });

// route for all post
router.get('/',async (req, res) => {
    try {
        const blog = await Blog.find()
        res.json(blog)
    } catch (error) {
        console.warn(error)
        res.json({message: error.message})
    }
    res.send(blog)      
})

   // route for single post

router.get('/:titleurl',async (req, res) => {
    try {
       const blog = await Blog.findOne({titleurl:req.params.titleurl})
       res.json(blog)

    } catch (error) {
        console.warn(error)
        res.json({message: error.message})
    }
})

router.put('/:titleurl',async (req,res) =>{
  const rid = req.body.userid
  if(rid===id){


    Blog.findOne({titleurl:req.params.titleurl},function(err, blog){
        if (err){
            res.send(err)
        }
        else{
                
            blog.title=req.body.post.title;
            blog.body=req.body.post.body;
            blog.date=req.body.post.date;
            blog.save(function(err){
                    if(err){
                    res.send
                    }
                    else{
                        res.json({message:'Mise a jour effectuée'})
                    }
                })
            }
            
    })
  }else{
    res.json({message:'Error'})

  }
})
router.delete('/:titleurl',async (req,res) =>{
  const rid = req.query.userid
  if(rid===id){

    Blog.remove({titleurl:req.params.titleurl},function(err, blog){
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