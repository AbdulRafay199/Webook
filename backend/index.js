const express = require('express');
const mongodbconnection = require("./db");
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));

app.use('/user', require('./routes/auth'));
app.use('/post', require('./routes/post'));
app.use('/friend', require('./routes/friend'));
app.use('/appreciation', require('./routes/appreciation'));
app.use('/comments', require('./routes/comments'));

app.listen(port,()=>{
    console.log(`webook app is working at http://localhost:${port}`)
})
mongodbconnection();