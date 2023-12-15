const express = require('express');
const appreciation = require('../model/Appreciation');
const router = express.Router();

const fetchuser = require('../middleware/fetchuserid')

// add like 
router.post('/addlike',fetchuser, async (req,res)=>{
        try {
                const userlike = await appreciation.create({
                    userid: req.user.id,
                    postid: req.body.postid,
                    likes: req.body.likes
                })
                const result = await userlike.save();
                res.json(result)

        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        } 
});

// get all likes of one specific post
router.get('/getalllikes/:id', async (req,res)=>{
                try {
                    const userpost = await appreciation.find({postid: req.params.id})
                    res.json(userpost)
                    
                } catch (error) {
                    console.log(error);
                    return res.status(500).json('Internal Server Error occured!');
                }
    });

// delete like 
router.delete('/deletelike/:id',fetchuser, async (req,res)=>{
            try {
                const postlikes = await appreciation.findOneAndDelete({postid: req.params.id, userid:req.user.id})
                res.json(postlikes)
                
            } catch (error) {
                console.log(error);
                return res.status(500).json('Internal Server Error occured!');
            }
    });
    

module.exports = router;