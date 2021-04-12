const express= require("express")
const multer = require('multer')

const router = require("express").Router();
// appel du model
const Blog = require('../models/blog.model');


router.post ("/", async (req,res)=>{

    const blog = new Blog({
        
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

module.exports = router;