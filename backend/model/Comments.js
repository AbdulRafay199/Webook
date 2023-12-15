const mongoose = require('mongoose');

const commentschema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    postid:{
        type: String,
        required: true
    },
    comment:{
      type: String,
      required: true  
    },
    replies:{
      type: Array,
      required: true  
    },
    likes:{
      type: Array,
      required: true  
    }

})

const commentmodel = mongoose.model('Comment',commentschema);
module.exports = commentmodel;