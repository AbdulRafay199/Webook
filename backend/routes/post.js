const express = require('express');
const post = require('../model/Post');
const {cloudinary} = require('../cloudinary')
const {body, validationResult} = require('express-validator');
const router = express.Router();

const fetchuser = require('../middleware/fetchuserid')

// add post 
router.post('/addpost',[
body('caption','caption length is too short').isLength({min:1}),
],fetchuser, async (req,res)=>{
    let success = false
    const error = validationResult(body);
    if(!error.isEmpty()){
        return res.status(400).json({success, error:'Please enter details correctly'});
    }
    else{
        try {
            if(req.body.img){
        
                cloudinary.uploader.upload(req.body.img, async (err,result)=>{
                    const userpost = await post.create({
                        userid: req.user.id,
                        caption: req.body.caption,
                        imgPublicid: result.public_id,
                        img: result.url,
                        loc: req.body.loc
                    })
                    const userpostresult = await userpost.save();
                    res.json(userpostresult)
                })
            }
            else{
                const userpost = await post.create({
                    userid: req.user.id,
                    caption: req.body.caption,
                    loc: req.body.loc
                })
                const userpostresult = await userpost.save();
                res.json(userpostresult)
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
    }
});

// share post 
router.post('/sharepost',[
body('caption','caption length is too short').isLength({min:1}),
],fetchuser, async (req,res)=>{
    let success = false
    const error = validationResult(body);
    if(!error.isEmpty()){
        return res.status(400).json({success, error:'Please enter details correctly'});
    }
    else{
        try {
            if(req.body.img){
                    const userpost = await post.create({
                        userid: req.body.userid,
                        shareduserid: req.user.id,
                        sharedpostid: req.body.sharedpostid,
                        caption: req.body.caption,
                        img: req.body.img,
                        loc: req.body.loc
                    })
                    const userpostresult = await userpost.save();
                    res.json(userpostresult)
            }
            else{
                const userpost = await post.create({
                        userid: req.body.userid,
                        shareduserid: req.user.id,
                        sharedpostid: req.body.sharedpostid,
                        caption: req.body.caption,
                        loc: req.body.loc
                })
                const userpostresult = await userpost.save();
                res.json(userpostresult)
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
    }
});

// get posts of your own 
router.get('/getpost',fetchuser, async (req,res)=>{
                try {
                    const userpost = await post.find({userid: req.user.id})
                    res.json(userpost)
                    
                } catch (error) {
                    console.log(error);
                    return res.status(500).json('Internal Server Error occured!');
                }
    });

// get all post 
router.get('/getallpost', async (req,res)=>{
                try {
                    const userpost = await post.find()
                    res.json(userpost)
                    
                } catch (error) {
                    console.log(error);
                    return res.status(500).json('Internal Server Error occured!');
                }
    });
// get all post of specific user 
router.get('/getindpost/:id', async (req,res)=>{
                try {
                    const userpost = await post.find()
                    const indpost = await post.find({userid:req.params.id})
                    res.json(indpost)
                    
                }catch (error) {
                    console.log(error);
                    return res.status(500).json('Internal Server Error occured!');
                }
    });

// edit post 
router.put('/editpost/:id',[
    body('caption','caption length is too short').isLength({min:1}),
    ],fetchuser, async (req,res)=>{
        let success = false
        const error = validationResult(body);
        if(!error.isEmpty()){
            return res.status(400).json({success, error:'Please enter details correctly'});
        }
        else{
            try {
                const userpost = await post.findById(req.params.id)
                if(userpost.userid !== req.user.id){
                    return res.status(400).json({success, error:'You are not allowed to Edit Someone else post'});
                }
                const result = await userpost.updateOne({
                    userid: req.user.id,
                    caption: req.body.caption,
                    img: req.body.img,
                    loc: req.body.loc
                })
                res.json(result)
                
            } catch (error) {
                console.log(error);
                return res.status(500).json('Internal Server Error occured!');
            }
        }
    });

// delete post 
router.delete('/deletepost/:id',fetchuser, async (req,res)=>{
            try {
                const userpost = await post.findById(req.params.id)
                if(userpost.userid !== req.user.id && userpost.shareduserid !== req.user.id){
                    return res.status(400).json({error:'You are not allowed to delete Someone else post'});
                }
                const result = await userpost.deleteOne();
                cloudinary.uploader.destroy(userpost.imgPublicid,(err,result)=>{
                    console.log(result)
                })
                res.json(result)
                
            } catch (error) {
                console.log(error);
                return res.status(500).json('Internal Server Error occured!');
            }
    });
    

module.exports = router;