const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/webook"

const mongodbconnection = ()=>{
    mongoose.connect(url,()=>{
        console.log("Connection to Mongodb for webook is Successfully made!")
    })
}
module.exports = mongodbconnection;