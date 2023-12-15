const mongoose = require('mongoose');

const appreciationschema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    postid:{
        type: String,
        required: true
    },
    likes:{
      type: String,
      required: true  
    }

})

const appreciationmodel = mongoose.model('Appreciation',appreciationschema);
module.exports = appreciationmodel;