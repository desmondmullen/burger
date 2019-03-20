const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', function (req, res) {
    displayAll(res);
});

function displayAll(res) {
    burger.all(function (data) {
        const hbsObject = {
            burgers: data
        };
        res.render('index', hbsObject);
    });
};

router.post('/', function (req, res) {
    burger.create(req.body.burger_name, function (result) {
        displayAll(res);
        // Send back the ID of the new burger
        // res.json({ id: result.insertId });
    });
});

router.put('/:id', function (req, res) {
    const condition = 'id = ' + req.params.id;
    burger.update({
        devoured: true
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            displayAll(res);
        }
    });
});

// Export routes for server.js to use.
module.exports = router;