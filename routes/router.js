const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/user');

// to fetch the index page
router.get('/', (req, res, next) => {
    return res.sendFile(path.join(__dirname + '/index/index.html'));
});

// to check whether the password and password Confirmation is same or not
router.post('/', (req, res, next) => {
    if (req.body.password !== req.body.passwordConf) {
        const err = new Error('Please enter correct password');
        err.status = 400;
        res.send("Please enter correct password");
        return next(err);
    }

    // To verify all the entries and store it in userData
    if(req.body.name && req.body.email && req.body.mobno && req.body.address && req.body.password && req.body.passwordConf) {
        var userData = {
            name: req.body.name,
            email: req.body.email,
            mobno: req.body.mobno,
            address: req.body.address,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        }

        User.create(userData, (error, user) => {
            if(error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('http://localhost:3001/');
            }
        });
// To check whether the entered email and password is valid or not
    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
            if(error || !user) {
                const err = new Error('Wrong email or password or not a registered user');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('http://localhost:3001/');
            }
        });
    } else {
        const err = new Error('All fields are required');
        err.status = 400;
        return next(err);
    }
})

// To create user profile and display name and email id
router.get('/profile', (req, res, next) => {
    User.findById(req.session.userId)
    .exec((error, user) => {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                const err = new Error('Not authorized! Go back!');
                err.status = 400;
                return next(err);
            } else {
                return res.send('<h1> Name: </h1>' + user.name + '<h2>Email: </h2>' + user.email + '<br><a type = "button" href="/logout">Logout</a>')
            }
        }
    });
});

// To logout
router.get('/logout', (req, res, next) => {
    if(req.session) {
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;