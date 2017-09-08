var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.json({
        submission: req.body,
        message: "Form submission received on the server from " + req.body.firstName + " " + req.body.lastName + "! ;)"
    });
});

module.exports = router;