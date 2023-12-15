const express = require('express');
const router = express.Router();

const fetchuser = require('../middleware/fetchuserid');
const comment = require('../model/Comments');

// add comment 
router.post('/addcomment',fetchuser, async (req,res)=>{
        try {
                const userlike = await comment.create({
                    userid: req.user.id,
                    postid: req.body.postid,
                    comment: req.body.comment,
                    $push:{
                        replies: null,
                        likes: null
                    }
                })
                const result = await userlike.save();
                res.json(result)

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        } 
});

// add like to comment 
router.put('/addliketocomment/:id',fetchuser, async (req,res)=>{
    try {
        const result = await comment.findOneAndUpdate(
            {
                postid: req.params.id, 
                userid:req.body.userid, 
                _id:req.body._id
                
            },
            {
                $addToSet:{
                    likes: {
                        likeuserid: req.user.id
                    }
                }
            }
        )
        res.json(result)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error occured!');
    }
});
// remove like to comment 
router.put('/dltlikefromcomment/:id',fetchuser, async (req,res)=>{
    try {
        const result = await comment.findOneAndUpdate(
            {
                postid: req.params.id, 
                userid:req.body.userid, 
                _id:req.body._id
                
            },
            {
                $pull:{
                    likes: {
                        likeuserid: req.user.id
                    }
                }
            }
        )
        res.json(result)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error occured!');
    }
});

// reply t0 comment 
router.put('/addreply/:id',fetchuser, async (req,res)=>{
    try {
        const result = await comment.findOneAndUpdate(
            {
                postid: req.params.id, 
                userid:req.body.userid, 
                _id:req.body._id
                
            },
            {
                $push:{
                    replies: {
                        id: req.user.id,
                        msg: req.body.replies.msg
                    }
                }
            }
        )
        res.json(result)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error occured!');
    }
});

// get all comments of one specific post
router.get('/fetchcomments/:id', async (req,res)=>{
                try {
                    const postcomments = await comment.find({postid: req.params.id})
                    res.json(postcomments)
                    
                } catch (error) {
                    console.log(error);
                    return res.status(500).json('Internal Server Error occured!');
                }
    });

// show all likes of specific comment 
router.post('/showlike/:id', async (req,res)=>{
            try {
                
                const postcommentlikes = await comment.find({postid: req.params.id, _id:req.body._id})
                res.json(postcommentlikes)
                
            } catch (error) {
                console.log(error);
                return res.status(500).json('Internal Server Error occured!');
            }
    });
// delete comment 
router.delete('/deletecomment/:id',fetchuser, async (req,res)=>{
            try {
                
                const postcomment = await comment.findOne({postid: req.params.id, userid:req.user.id, _id:req.body._id})
                if(!postcomment){
                    return res.status(400).json('You cannot delete other user comment!');
                }
                const dltresult = await postcomment.deleteOne();
                res.json(dltresult)
                
            } catch (error) {
                console.log(error);
                return res.status(500).json('Internal Server Error occured!');
            }
    });
    

module.exports = router;