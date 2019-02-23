const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    return res.sendFile(path.join(__dirname + '/index/index.html'));
});

router.post('/', (req, res, next) => {
    if (req.body.password !== req.body.passwordConf) {
        const err = new Error('Please enter correct password');
        err.status = 400;
        res.send("Please enter correct password");
        return next(err);
    }

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

// router.get('/:id', (req, res) => {
//     let id = req.params.id;

//     User.findById(id).then((User) => {
//         if(user) {
//             res.send(user);
//         } else {
//             res.status(404).send({
//                 notice: 'User not found'
//             })
//         }
//     })
//     .catch((err) => {
//         res.send(err);
//     })
// });

// router.delete('/users/:id', (req, res) => {
//     let token = req.header('x-auth');
//     let detoken = tokenValidate(token);
//     id = deToken.id;
//     User.findById(id).then((user) => {
//         let found = user.token.find(ele => {return ele.token == token});
//         user.tokens.remove(found_id);
//         return user.save()
//     }).then((user) => {
//         res.send({
//             notice: 'successfully logged out'
//         });
//     })
//     .catch((err) => {
//         res.send(err);
//     });
// });

// tokenValidate = function(token) {
//     let sentToken = token;
//     sentToken = jwt.verify(sentToken, 'supersecret');
//     return sentToken;
// }

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