const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', function(req, res, next){
    return res.sendFile(path.join(__dirname + '/index/index.html'));
});

router.post('/', function(req, res, next) {
    if (req.body.password !== req.body.passwordConf) {
        const err = new Error('Please enter correct password');
        err.status = 400;
        res.send("Please enter correct password");
        return next(err);
    }

    if(req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        }

        User.create(userData, function(error, user) {
            if(error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });

    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
            if(error || !user) {
                const err = new Error('Wrong email or password');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    } else {
        const err = new Error('All fields are required');
        err.status = 400;
        return next(err);
    }
})

router.get('/profile', function(req, res, next) {
    User.findById(req.session.userId)
    .exec(function(error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                const err = new Error('Not authorized! Go back!');
                err.status = 400;
                return next(err);
            } else {
                return res.send('<h1> Name: </h1>' + user.username + '<h2>Email: </h2>' + user.email + '<br><a type = "button" href="/logout">Logout</a>')
            }
        }
    });
});