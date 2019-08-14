const router = require('express').Router();

const routes = route => require(`./${route}`);

router.use('/auth', routes('auth-router'));
router.use('/event', routes('event-router'));
router.use('/analytic', routes('analytic-router'));

module.exports = router;
