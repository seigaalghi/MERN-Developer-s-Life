const { request } = require('express');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const { route } = require('./profile');

// @ROUTE   POST API/POSTS
// @DESC    Create a Oist
// @ACCESS  Private

router.post(
  '/',
  [auth, [check('text', 'Text is Required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-passowrd');

      const post = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      await post.save();
      res.status(200).json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @ROUTE   POST API/POSTS
// @DESC    Get All Post
// @ACCESS  Private

router.get('/', auth, async (req, res) => {
  try {
    post = await Post.find().sort({ date: -1 });

    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE   POST API/POSTS/:id
// @DESC    Get One Post
// @ACCESS  Private

router.get('/:post_id', auth, async (req, res) => {
  try {
    post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: 'Post Not Found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post Not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// @ROUTE   Delete API/POSTS/:post_id
// @DESC    Delete One Post
// @ACCESS  Private

router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: 'Post Not Found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "You Don't Owe This Post" });
    }

    await Post.findByIdAndRemove(req.params.post_id);
    res.status(200).json('Post Removed');
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post Not Found' });
    }
    res.status(500).send('Server Error');
  }
});

// @ROUTE   Put API/POSTS/like/:post_id
// @DESC    Like The Post
// @ACCESS  Private

router.post('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE   Put API/POSTS/like/:post_id
// @DESC    unLike The Post
// @ACCESS  Private

router.delete('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'post has not yet been liked' });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE   put API/POST/comment/:post_id
// @DESC    Comment on a post
// @ACCESS  Private

router.post(
  '/comment/:post_id',
  [auth, [check('text', 'Text is Required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-passowrd');
      const post = await Post.findById(req.params.post_id);
      const comment = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      post.comment.unshift(comment);

      await post.save();
      res.status(200).json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @ROUTE   delete API/POSTS/comment/:post_id/:comment_id
// @DESC    Delete a comment
// @ACCESS  Private

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    const comment = post.comment.find(
      (comment) => comment.id == req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "comment doesn't exist" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: "You don't Owe This Comment" });
    }
    const removeIndex = post.comment
      .map((cmn) => cmn.id.toString())
      .indexOf(req.params.comment_id);

    post.comment.splice(removeIndex, 1);

    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
