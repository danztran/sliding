const router = require('express').Router();

const routes = route => requireWrp(`routes/${route}`);

/* GET home page. */
router.use('/', routes('index'));
router.use('/', routes('vue-router'));

module.exports = router;
