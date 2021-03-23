const Posts = require('../models/Posts');

exports.posts = async (req, res, next) => {
  const posts = await Posts.findAll();
  
  res.status(200).send(posts);
}