const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require('../helper/verifyToken');

//ADD POST
router.post('/add', verifyToken, async(req, res) => {
   try{

    const post = await new Post(req.body);
    const savePost = await post.save();
    res.status(200).json(savePost);

   }catch(err){
    res.status(401).json({ msg: err.message});
   }

})

module.exports = router;
