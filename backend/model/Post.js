const mongoose = require('mongoose');

const postschema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    shareduserid:{
        type: String,
        required: true,
        default: 'none'
    },
    sharedpostid:{
        type: String,
        required: true,
        default: 'none'
    },
    caption:{
        type: String,
    },
    imgPublicid:{
        type: String,
        required:true,
        default:'none'
    },
    img:{
        type: String,
        required: true,
        default: 'none'
    },
    loc:{
        type: String,
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    }

})

const postmodel = mongoose.model('Post',postschema);
module.exports = postmodel;