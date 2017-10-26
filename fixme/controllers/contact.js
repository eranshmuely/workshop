const nodemailer = require('nodemailer');
const exec = require('child_process').exec;

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {

  exec(`echo "${req.body.message}" | sendmail -v ${req.body.email}`,
  (err, stdout, stderr)=>{
    if (err) {
      req.flash('errors', [{msg: err}]);
      return res.redirect('/contact');
    }

    if (stderr) {
      req.flash('errors', [{msg: stderr}]);
    } else {
      req.flash('success', {msg: stdout});
    }

    res.redirect('/contact');

  });



};
