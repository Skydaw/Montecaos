// const express = require("express")
// const mongoose = require('mongoose')

require('dotenv/config');
const userRoutes = require('./routes/user.routes');
const blogRoutes = require('./routes/blog.routes')
// const cors = require('cors')
// const cookieParser= require('cookie-parser')
// const multer = require("multer");

// const GridFsStorage = require("multer-gridfs-storage");




// // Connection a la base de donnée
// const mongoURI = process.env.MONGO_URL

// const conn = mongoose.createConnection(mongoURI)

// conn.once('open', () => {
//   console.log('Connection Successful')
// })

// const app = express();

// // Create storage engine
// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err)
//             console.log('yo')
//           }
//           const filename = file.originalname
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads',
//           }
//           resolve(fileInfo)
//         })
//       })
//     },
//   })
  
//   const upload = multer({ storage })



// // utilisation de cookie parser

// app.use(cookieParser())

// app.use(cors({
//     credentials:true,
//     origin:['http://localhost:5000','http://localhost:3000','http://localhost:8080']
// }))

// app.use(express.json());

// // Route
// app.use('/api/user', userRoutes);
// app.use('/api/blog', blogRoutes);

// app.post('/', upload.single('img'), (req, res, err) => {
//     if (err) throw err
//     res.status(201).send()
//   })

// app.listen(5000);

// app.get('/:filename', (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//       // Check if file
//       if (!file || file.length === 0) {
//         return res.status(404).json({
//           err: 'No file exists',
//         })
//       }
  
//       // Check if image
//       if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//         // Read output to browser
//         const readstream = gfs.createReadStream(file.filename)
//         readstream.pipe(res)
//       } else {
//         res.status(404).json({
//           err: 'Not an image',
//         })
//       }
//     })
//   })
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const Blog = require('./models/blog.model');


const app = express();

app.use(bodyParser.json());
app.use(cors());

//Connect to DB
const mongoURI =process.env.MONGO_URL;

const conn = mongoose.createConnection(mongoURI);

mongoose.connect(mongoURI, { useNewUrlParser: true });

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
// Route
app.use('/api/user', userRoutes);
app.use('/api/blog', blogRoutes);

const upload = multer({ storage });

app.post("/", upload.single("img"), (req, res, err) => {
    const blog = new Blog({
        title:req.body.title,
        body:req.body.body,
        date: req.body.date,
        img:req.file
    })
    console.log(blog)
    const result =  blog.save();
    res.send(result);

    
});

app.get("/:filename", (req, res) => {
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

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));