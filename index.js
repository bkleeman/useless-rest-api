const app = require('express')()
var passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy;  // Want to use Basic Authentication Strategy

// Other middleware

var user = { username: 'admin', password: 'supersecret', email: 'admin@example.com' };
passport.use(new BasicStrategy(
  function(username, password, done) {
    // Example authentication strategy using 
    if ( !(username === user.username && password === user.password) ) {
      return done(null, false);
    }
    return done(null, user);
}));

app.get('/',
  function(req, res) {
    res.sendFile('index.html', { root: __dirname });
  });

  // Look into express app.all() so you can protect all endpoints

  app.get('/albums',
    passport.authenticate('basic', { session: false }),
    function(req, res) {
      res.sendFile('/albums.json', { root: __dirname });
    }
  );

app.listen( 3000, "0.0.0.0")