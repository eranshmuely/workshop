const Post = require('../models/Post');

exports.post = (req, res)=>{

  const text = req.body.text;

  // Block XSS
  if (
    text.includes('<script>') || text.includes('<img') ||
    text.includes('<a') || text.includes('onerror') ||
    text.includes('onmouse') || text.includes('javascript') ||
    text.includes('onload')) {
    req.flash('errors', [{msg: 'Illegal HTML tags detected'}]);
    return res.redirect('/');
  }

  Post.create({ user: req.user.id, text }, (err)=>{
    req.flash('success', {msg: 'Posted successfuly!'});
    return res.redirect('/')
  });

};
