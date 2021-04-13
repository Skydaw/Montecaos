const multer = require('multer')
const GridFsStorage = require("multer-gridfs-storage"); 
const crypto = require("crypto");
const mongoose = require('mongoose')
const Grid = require("gridfs-stream");
const cors = require('cors')
const bodyParser = require('body-parser')


const mongoURI =process.env.MONGO_URL;

const router = require("express").Router();
const conn = mongoose.createConnection(mongoURI);

router.use(cors())
router.use(bodyParser.json());
// appel du model
const Blog = require('../models/blog.model');

// route post un nouvelle article
router.post ("/", async (req,res)=>{

    const blog = new Blog({
        titleurl:req.body.titleurl,
        title: req.body.title,
        body: req.body.body,
        date: req.body.date,
        img:req.body.img,
        
    }) 
     await blog.save()
        .then((result)=>{
        res.send(result);
    }).catch((err)=> next(err))

   });
// logique et post image
   let gfs;
   
   conn.once("open", () => {
     gfs = Grid(conn.db, mongoose.mongo);
     gfs.collection("uploads");
     console.log("Connection Successful");
   }); 

   // Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
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

   const upload = multer({ storage });

   router.post("/image", upload.single("img"), (req, res, err) => {
       const blog = new Blog({
           img:req.file
       })
       console.log(blog)
       const result =  blog.save();
       res.send(result);
   
       
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
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image"
        });
      }
    });
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
    Blog.findOne({titleurl:req.params.titleurl},function(err, blog){
        if (err){
            res.send(err)
        }
        else{
                
            blog.title=req.body.title;
            blog.body=req.body.body;
            blog.date=req.body.date;
            blog.save(function(err){
                    if(err){
                    res.send
                    }
                    else{
                        res.json({message:'Mise a jour effectuer'})
                    }
                })
            }
            
    })

})
router.delete('/:titleurl',async (req,res) =>{
    Blog.remove({titleurl:req.params.titleurl},function(err, blog){
        if (err){
            res.send(err)
        }
        else{   
            res.json({message:'Suppression effectuer '})
        }
    })
})

   
   
module.exports = router;