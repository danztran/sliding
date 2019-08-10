const router = require('express').Router();

const routes = route => require(`./${route}`);

router.use('/auth', routes('auth-router'));
router.use('/event', routes('event-router'));

module.exports = router;
