const express = require('express');
const _ = require('lodash');
const { Admin } = require('../models/admin');
const router = express.Router();
const {ObjectId} = require('mongodb');

router.get('/', (req, res) => {
    Admin.find().then((admins) => {
        res.send(employees);
    })
    .catch((err) => {
        res.send(err);
    })
});

router.post('/', (req, res) => {
    let body = _.pick(req.body, ['name', 'salary', 'email', 'ageWhileJoining', 'skills', 'education']);
    let admin = new Admin(body);
    admin.save().then((admin) => {
        res.send(admin);
    })
    .catch((err) => {
        res.send(err);
    })
});

router.get('/:id/education_details', (req, res) => {
    let id = req.params.id;
    Admin.findById(id).then((admin) => {
        res.send(employee.education);
    })
})

router.get('/:id/education_details/:education_id', (req, res) => {
    let id = req.params.id;
    let educationId = req.params.education_id;
    Admin.findById(id).then((admin) => {
        res.send(admin.education.id(educationId));
    });
});

router.post('/:id/education_details', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['eduType', 'yearOfPassing']);
    Admin.findById(id)
    .then((admin) => {
        admin.education.push(body);
        return admin.save()
    }).then((admin) => {
        res.send(admin);
    })
    .catch((err) => {
        res.send(err);
    });
});

router.delete('/:id/education_details/:education_id', (req, res) => {
    let id = req.params.id;
    let educationId = req.params.education_id;

    Admin.findById(id).then((admin) => {
        admin.education.remove(educationId);
        return employee.save()
    }).then((admin) => {
        res.send(admin);
    }).catch((err) => {
        res.send(err);
    });
});

router.put('/:id/education_details/:education_id', (req, res) => {
    let id = req.params.id;
    let educationId = req.params.education_id;
    let body = _.pick(req.body, ['eduType', 'yearOfPassing'])
})