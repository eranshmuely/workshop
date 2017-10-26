const Post = require('../models/Post')

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {

  Post.find().sort({_id : -1}).limit(4).populate('user').exec((err, posts)=>{
    if (err) {
      res.render('home', {
        title: 'Home',
        posts: []
      })
      return
    }

    res.render('home', {
      title: 'Home',
      posts
    });
  });
  
};
