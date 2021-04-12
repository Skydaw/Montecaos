const router = require("express").Router();
// permet de crypter les mots de passe
const bcrypt = require('bcryptjs');
// permet de creer des token de connection
const jwt = require('jsonwebtoken')
// appel le model de User
const User = require('../models/user.model');


router.post('/register', async (req,res)=>{
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password: hashedPassword,
    })

    const result = await user.save();
    const {password, ...data}= await result.toJSON();

    res.send(data);

})


// rajout route / login
router.post('/login',async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    // verifié le mail est dans la base de donnée
    if(!user){
        return res.status(404).send({
            message:'Use not found'
        })
    }
    // verifier que le mot de passe est valide
    if(!await bcrypt.compare(req.body.password, user.password)){
        return res.status(404).send({
            message:'Invalid credentials'
        })
    }
    // creer token de session
    const token = jwt.sign({_id:user._id},'secret')
    res.cookie('jwt',token,{
        // uniquement pour des requete http
        httpOnly:true,
        //1 day en ms 
        maxAge: 24 * 60 *60 *1000 
    })
    res.send(
        {
            message:'Authentification success'
        }
    )

})
// la route /user va servir a recuperer les infos de l'utilulisatuer authentifiée

router.get('/', async (req,res)=>{

    try{

        const cookie = req.cookies['jwt'];
        
        const claims= await jwt.verify(cookie,'secret');
        if(!claims){
            return res.status(401).send({
                message:'Not authentified'
            })
        }
        const user = await User.findOne({_id:claims._id})
        const {password, ...data}= await user.toJSON();
        
        res.send(data)
    }
    catch(error){
        return res.status(401).send({
            message:'Not authentified'
        })
    }
})

router.post('/logout',(req,res)=>{
    res.cookie('jwt','',{maxAge:0});
    res.send({
        message:'Successfully logged out'
    })
})

module.exports = router;