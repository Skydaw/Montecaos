const mongoose = require('mongoose')
 
const userSchema = new mongoose.Schema({
    nom:{
        type: String,
        require:true,
    },
    prenom:{
        type: String,
        require:true,
    },
    datenaissance:{
        type: String,
        require:true,
    },    
    email:{
        type: String,
        unique:true,
        require:true,
    },
    password:{
        type: String,
        require:true,
    },
    adresse:{
        type: String,
        require:true,
    },
    complement:{
        type: String
    },
    ville:{
        type: String,
        require:true,
    },
    codepostal:{
        type: String,
        require:true,
    },
    pays:{
        type: String,
        require:true,

    },
    telephone:{
        type: String,
    },
    role:{
        type: String,
    }


})
module.exports = mongoose.model('User',userSchema)