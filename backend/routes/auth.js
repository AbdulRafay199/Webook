const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const user = require('../model/User');
const {body, validationResult} = require('express-validator');
const router = express.Router();

const fetchuser = require('../middleware/fetchuserid')

const jwtseckey = "rafayabdulwebookapp2002123";

// signup
router.post('/adduser',[
    body('name','Please Enter Valid email').isLength({min:3}),
    body('email','Please Enter Valid email').isEmail(),
    body('password','Please Enter Valid email').isLength({min:5})
], async (req,res)=>{
    let success = false
    const error = validationResult(body);
    if(!error.isEmpty()){
        return res.status(400).json({success, error:'Please enter details correctly'});
    }
    else{
        try {
            const useremail = await user.findOne({email:req.body.email})
            if(useremail){
                return res.status(400).json({success, error:'Email already exist!'})
            }
            else{
                const salt = await bcrypt.genSalt(10);
                const secpass = await bcrypt.hash(req.body.password,salt);
                const userdetails = await user.create({
                    name: req.body.name,
                    username: req.body.username,
                    userimg: req.body.userimg,
                    gender: req.body.gender,
                    age: req.body.age,
                    profession: req.body.profession,
                    tagline: req.body.tagline,
                    discription: req.body.discription,
                    email: req.body.email,
                    password: secpass
                })

                const data = {
                    user: {
                        id: userdetails._id
                    }
                }
                success = true
                const authtoken = jwt.sign(data,jwtseckey)
                res.json({success,authtoken});
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
    }
});

// login
router.post('/login',[
    body('email','Please Enter Valid email').isEmail()
], async (req,res)=>{
    let success = false
    const error = validationResult(body);
    if(!error.isEmpty()){
        return res.status(400).json({success, error:'Please enter details correctly'});
    }
    else{
        try {
            const userdata = await user.findOne({email:req.body.email})
            if(!userdata){
                return res.status(400).json({success, error:'Please enter correct credentials'})
            }
            else{
                const pw = await bcrypt.compare(req.body.password,userdata.password)
                if(!pw){
                    return res.status(400).json('Please enter correct credentials')
                }
                else{

                    const data = {
                        user: {
                            id: userdata._id
                        }
                    }
                    success = true
                    const authtoken = jwt.sign(data,jwtseckey)
                    res.json({success,authtoken});
                }

            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
    }
});

// edit userdetails 
router.patch('/edituser',[
    body('caption','caption length is too short').isLength({min:1}),
    ],fetchuser, async (req,res)=>{
        let success = false
        const error = validationResult(body);
        if(!error.isEmpty()){
            return res.status(400).json({success, error:'Please enter details correctly'});
        }
        else{
            try {
                const userdetails = await user.findById(req.user.id)
                const result = await userdetails.updateOne({
                    name: req.body.name,
                    username: req.body.username,
                    userimg: req.body.userimg,
                    gender: req.body.gender,
                    age: req.body.age,
                    profession: req.body.profession,
                    tagline: req.body.tagline,
                    discription: req.body.discription,
                })
                res.json(result)
                
            } catch (error) {
                console.log(error);
                return res.status(500).json('Internal Server Error occured!');
            }
        }
    });
    
// fetchuser
router.get('/getuser',fetchuser, async (req,res)=>{
        try {

            const userid = req.user.id;
            const userdata = await user.findById(userid).select("-password");
            res.json(userdata);

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

// fetchalluser
router.get('/getalluser', async (req,res)=>{
        try {

            const userdata = await user.find().select("-password");
            res.json(userdata);

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});
// fetch individual user
router.get('/getinduser/:id', async (req,res)=>{
        try {
            const userdata = await user.find({_id:req.params.id}).select("-password");
            res.json(userdata);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

module.exports = router;