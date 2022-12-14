const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Post');   
const { check , validationResult } = require('express-validator/check');
// @route  GET api/Posts
// @des    tex route
// @Public acess

router.post('/',
[
    auth,
        [
          check('text' ,'Text is required')
          .not()
          .isEmpty()  
        ]
],async(req,res) => {
       const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const newPost = new Post({
                text: req.body.text,
                name:user.name,
                avatar:user.avatar,
                user:req.user.id
            });
            const post = await newPost.save();
            res.json(post);
        }catch(err) {
            console.error(err.message);
            return res.json('Sever Error');
        }
    }
);

// @route  GET api/Posts
// @des    get All post
// @access Private

router.get('/',auth,async(req,res) => {
    try {
        const posts = await Post.find().sort({date: -1 });
        res.json(posts);
    }catch(err) {
        console.error(err.message);
        return res.status(400).json('Sever Error');
    }
});

// @route  GET api/Posts
// @des    get All post
// @access Private

router.get('/:id',auth,async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({msg:'Post not found'});
        }
        res.json(post);
    }catch(err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg:'Post not found'});
        }
        return res.status(400).json('Sever Error');
    }
});



// @route  GET api/Posts
// @des    get find postById
// @access Private

router.delete('/:id',auth,async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        //check user
        if(!post) {
            return res.status(404).json({msg:'Post not found'});
        }
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg:'User not authorize'});
        }
        await post.remove();
        return  res.json({msg:'Post is removed'});
    }catch(err) {
        console.error(err.message);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg:'Post not found'});
        }
        return res.status(400).json('Sever Error');
    }
});


// @route  Put api/Posts
// @des    like a post
// @access Private

router.put('/like/:id',auth,async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check if the user has already been like
        if(post.like.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg:'Post already liked'});
        }
        post.like.unshift({ user:req.user.id });
        await post.save();
        res.json(post.like);
    }catch(err) {
        console.error(err.message);
        return res.status(400).json("Server Error");
    }
});

// unlike
// @route  PUT api/post/unlike/:id
// @des    like a post
// @access Private

router.put('/unlike/:id', auth,async (req,res) => {

    try {
        const post = await Post.findById(req.params.id);
        //check if the post has already been like
        if(
            post.like.filter(like =>like.user.toString() === req.user.id).length === 0
        ){
            return res.status(400).json({ msg : 'Post has not yet been liked..'});
        }
        
        //Get remove index
        const removeIndex = post.like.map(like =>like.user.toString()).indexOf(req.user.id);
        post.like.splice(removeIndex, 1);
        await post.save();
        res.json(post.like);
    }catch(err) {
        console.error(err.message);
        return res.status(400).json("Server Error");
    }
});

// @router POST api/post/comment/:id
// @desc Comment on post
// @access Private

router.post('/comment/:id',
    [
        auth,[
            check('text','Text is required')
            .not()
            .isEmpty()
        ]
    ], async (req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log('validate');
            return res.status(400).json({ errors:errors.array() });
        }

        try {
            console.log('try');
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);
            
            const newComment = {
                text : req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);
            await post.save();
            res.json(post.comments);
        }catch(err) {
            console.error(err.message);
            return res.status(400).send('Server Error');
        }
    });

    // @router DELETE api/posts/comment/comment_id
    // @desc Delete Comment
    // @access Private
    router.delete('/comment/:id/:comment_id',auth, async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            // Pull out comment
            const comment = post.comments.find(comment => comment.id === req.params.comment_id);

            //Make sure comment exits
            if(!comment) {
                return res.status(404).json({ msg : 'Comment does not exists'});
            }

            //check user
            if(comment.user.toString() !== req.user.id) {
                return res.status(401).json({ msg : 'User not authorized'});
            }

            //Get remove index
            const removeIndex = post.comments.map(comment =>comment.user.toString()).indexOf(req.user.id);
            post.comments.splice(removeIndex, 1);
            await post.save();
            res.json(post.comments);    
        }catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })
module.exports = router;