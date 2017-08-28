const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

router.get('/ninjas', function (req, res, next) {
    // Ninja.find({}).then(function(ninjas) {
    //    res.send(ninjas);
    // });
    Ninja.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.Ing), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function (ninjas) {
        res.send(ninjas);
    });
});

router.post('/ninjas', function (req, res, next) {
    Ninja.create(req.body).then(function (ninja) {
        res.send(ninja);
    }).catch(next);
});

router.put('/ninjas/:id', function (req, res, next) {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body)
        .then(function () {
            Ninja.findOne({_id: req.params.id}).then(function (data) {
                res.send(data);
            });
        });
});

router.delete('/ninjas/:id', function (req, res, next) {
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function (ninja) {
        res.send(ninja);
    }).catch(next);
});

module.exports = router;



