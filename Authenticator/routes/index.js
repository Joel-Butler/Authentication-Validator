var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var authenticated = req.isAuthenticated();
  var userDetails = req.appSession.claims;
  res.render('index', { title: 'Express', Auth: req.isAuthenticated() ? 'Logged in' : 'Logged out', UserDetails: userDetails});
});

module.exports = router;
