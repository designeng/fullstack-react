var express = require('express');
var router  = express.Router();

router.get('/test', function(req, res) {
    res.end("test");
});

module.exports = router;