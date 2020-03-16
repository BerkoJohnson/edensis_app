const passport  = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, (username, password, done) => {
    // Search for user from Mongodb with the supplied email
    User.findOne({email: username}, (err, user) => {
        if(err) {return done(err); } // if err
        if(!user) { // if no user is found
            return done(null, false, {
                message: 'Incorrect username.'
            });
        }

        if(!user.verifyPassword(password)) { // if password is incorrect
            return done(null, false, {
                message: 'Incorrect password.'
            });
        }

        // if no errors, return user object
        return done(null, user);
    })
}))