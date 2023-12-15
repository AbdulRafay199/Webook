const express = require('express');
const friend = require('../model/Friend');
const router = express.Router();

const fetchuser = require('../middleware/fetchuserid')


// create friendlist
router.post('/createfriendlist',fetchuser, async (req,res)=>{
        try {
            const userfriendlist = await friend.create({
                userid: req.user.id,
                $push:{
                    friendid: null
                }
            })
            res.json(userfriendlist)
            
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

// add friend 
router.put('/addfriend',fetchuser, async (req,res)=>{
        try {
            if(req.user.id == req.body.friendid){
                return res.status(400).json('You can not add yourself as a friend!');
            }
            const result = await friend.findOneAndUpdate(
                {
                    userid: req.user.id
                },
                {
                    $addToSet:{
                        friendid: req.body.friendid
                    }
                }
            )
            res.json(result)
            
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
});

// get friendlist 
router.get('/getfriend',fetchuser, async (req,res)=>{
                try {
                    const userpost = await friend.findOne({userid: req.user.id})
                    res.json(userpost.friendid)
                    
                } catch (error) {
                    console.log(error);
                    return res.status(500).json('Internal Server Error occured!');
                }
    });

// delete friend 
router.put('/deletefriend',fetchuser, async (req,res)=>{
        try {
            const result = await friend.findOneAndUpdate(
                {
                    userid: req.user.id
                },
                {
                    $pull:{
                        friendid: req.body.friendid
                    }
                }
            )
            res.json(result)
            
        } catch (error) {
            console.log(error);
            return res.status(500).json('Internal Server Error occured!');
        }
    });
    

module.exports = router;