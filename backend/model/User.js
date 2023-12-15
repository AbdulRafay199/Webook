const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    userimg:{
        type: String,
        required: true,
        default:"none"
    },
    gender:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    profession:{
        type: String,
        default:"none"
    },
    tagline:{
        type: String,
        default:"none"
    },
    discription:{
        type: String,
        default:"none"
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    }
})

const usermodel = mongoose.model('User',userschema);
module.exports = usermodel;