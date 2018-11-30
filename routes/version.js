var express = require('express');
var fs = require('fs');

var router = express.Router();

var matrix = JSON.parse(fs.readFileSync('./config/customerMatrix.json'));

const app = express();

router.get('/version', (req, res) => {

    var customer;
    var env;
    var url;

    if (req.query.url) {
        url = req.query.url;
        if (matrix.urlmap[url]) {
            customer = matrix.urlmap[url]["customer"];
            env = matrix.urlmap[url]["env"];
        } else {
            var parts = url.split(".");
            customer = parts[0];
            env = parts[1];
        }
    } else {
        env = req.query.env;
        customer = req.query.customer;
    }

    res.send(matrix["customers"][customer][env]);

});

router.post('/version', (req, res) => {
    matrix = req.body;
    res.send("customerMatrix set to " + JSON.stringify(matrix));
});

router.get('/matrix', (req, res) => {
    res.send(JSON.stringify(matrix));
});

module.exports = router;
