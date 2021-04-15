const router = require("express").Router();
// permet de crypter les mots de passe
const bcrypt = require('bcryptjs');
// permet de creer des token de connection
const jwt = require('jsonwebtoken')
// appel le model de User
const User = require('../models/user.model');

  

// route inscription utilisateur
router.post('/register', async (req,res)=>{
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        nom:req.body.nom,
        prenom:req.body.prenom,
        datenaissance:req.body.datenaissance,
        email:req.body.email,
        password: hashedPassword,
        adresse:req.body.adresse,
        complement:req.body.complement,
        ville:req.body.ville,
        codepostal:req.body.codepostal,
        pays:req.body.pays,
        telephone:req.body.telephone,
        role:req.body.role
    })

   await user.save()
    .then((result)=>{
        const {password, ...data} =  result.toJSON();
        res.send(data);
   }).catch((err)=> next(err))
   


})


// rajout route / login
router.post('/login',async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    // verifié le mail est dans la base de donnée
    if(!user){
        return res.status(404).send({
            message:'User not found'
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
// la route /user va servir a recuperer les infos de l'utilisateur authentifiée

router.get('/', async (req,res)=>{

    try{
        // recuperer cookie present sur la machine
        const cookie = req.cookies['jwt'];

        //Je vérifie que le cookie via la méthode verify de jwt -> Je vais retourner l'id utilisé pour le cookie et un id de cryptage
        
        const claims= await jwt.verify(cookie,'secret');
        // si cookie non valide
        if(!claims){
            return res.status(401).send({
                message:'Not authentified'
            })
        }
        // si cookie valide
        const user = await User.findOne({_id:claims._id})
        const {password, ...data}= await user.toJSON();
        
        // renvoie des infos de l'utilisateur
        res.send(data)
    }
    catch(error){
        return res.status(401).send({
            message:'Not authentified'
        })
    }
})
router.put('/modifier/:_id',(req,res)=>{
    User.findOne({_id:req.params._id},function(err,user){
        if(err){
            res.send(err)
        }
        else{
            console.log(req.body)
            user.nom=req.body.nom,
            user.prenom=req.body.prenom,
            user.datenaissance=req.body.datenaissance,
            user.email=req.body.email,
            user.adresse=req.body.adresse,
            user.complement=req.body.complement,
            user.ville=req.body.ville,
            user.codepostal=req.body.codepostal,
            user.pays=req.body.pays,
            user.telephone=req.body.telephone,
            user.save(function(err){
                if(err){
                    res.send
                }
                else{
                    res.json({message:'Mise à jour effectuée'})
                }
            })
            
        }
    })
})

// se deconnecter
router.post('/logout',(req,res)=>{
    res.cookie('jwt','',{maxAge:'1'});
    res.send({
        message:'Successfully logged out'
    })
})

module.exports = router;