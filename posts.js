const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Posts');

router.post('/', auth, async (req, res) => {
   try {
     const post = new Post ({ text: req.body.text, user: req.user.id });
     await post.save();
     res.json(post);
   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server error');
   }
});
  
  
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }  
});

Module.exports = router; 
