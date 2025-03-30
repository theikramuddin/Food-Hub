const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

function init(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        
        const user = await User.findOne({email: email});
        if(!user){
            return done(null, false, {message: 'No user with that email'});
        }

        bcrypt.compare(password, user.password).then(match => {
            if(match){
                return done(null, user, {message: 'Logged in successfully'});
            }
            return done(null, false, {message: 'Wrong username or password'});
        }).catch(err => {
            return done(null, false, {message: 'Something went wrong'});
        });

        // const match = await user.isValidPassword(password);
        // const match = await user.isValidPassword(password);
        // if(!match){
        //     return done(null, false, {message: 'Wrong password'});
        // }
        // return done(null, user);

    }));

    passport.serializeUser((user, done) => {

        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {

        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }

        // User.findById(id, (err, user) => {

        //     done(err, user);
        // })
    })



}

module.exports = init