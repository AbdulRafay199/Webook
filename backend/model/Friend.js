const mongoose = require('mongoose');

const friendschema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    friendid:{
        type: [String],
        required: true
    }
})

const friendmodel =  mongoose.model('Friend', friendschema);

module.exports = friendmodel;