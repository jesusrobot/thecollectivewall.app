const Posts = require('../models/Posts');

exports.mostrarHome = async (req, res) => {
  const posts = await Posts.findAll();

  res.render('index', {
    posts,
    page: 'index'
  });
}

exports.guardarPost = async (req, res, next) => {
  const posts = await Posts.findAll();
  const {postContent, postSignature, numLetters, date} = req.body.post;
  
  await Posts.create({postContent, postSignature, numLetters, date});
  
  res.status(200).send(posts);
}