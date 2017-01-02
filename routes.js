var router = require('express').Router();
var path = require('path');


router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'views/main.html'));
});

module.exports = router;
