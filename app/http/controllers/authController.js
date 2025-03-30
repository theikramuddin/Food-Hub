const passport = require('passport');
const User = require('../../models/user')
const bcrypt = require('bcrypt')
function authController() {
    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res, next) {
            const { email, password } = req.body;

            // Validation request
            if (!email || !password) {
                req.flash('error', 'All fields are required');
                return res.redirect('/login');
            }

            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash("error", info.message);
                    return next(err);
                }

                if (!user) {
                    req.flash("error", info.message);
                    return res.redirect('/login');
                }

                req.logIn(user, (err) => {
                    if (err) {
                        req.flash("error", info.message);
                        return next(err);
                    }

                    return res.redirect('/');
                })
            })(req, res, next);

            // const { email, password } = req.body;
        },
        register(req, res) {
            res.render('auth/register')
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;

            // Validation request
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            // Check if email exists
            const findUser = await User.findOne({ email })
            if (findUser) {
                req.flash("error", "Already Registred..!!")
                return res.redirect("/register")
            }

            //Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            //create user
            const user = new User({
                name,
                email,
                password: hashedPassword
            });

            user.save().then((user) => {
                res.redirect('/');
            }).catch((err) => {
                req.flash("error", "Something went wrong");
                return res.redirect('/register');
            });

        },
        logout(req, res, next) {
            req.logout(function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/login');
            });
        }
        
    }
}
module.exports = authController;