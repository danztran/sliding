const router = require('express').Router();

const messageMdw = requireWrp('middlewares/message-middleware');
const errorHandlerMdw = requireWrp('middlewares/error-handler-middleware');
const routes = route => requireWrp(`routes/${route}`);

/* GET home page. */
router.use(messageMdw);
router.use('/', routes('home-router'));
router.use('/auth', routes('auth-router'));
router.use('/event', routes('event-router'));
router.use('/', routes('vue-router'));
router.use(errorHandlerMdw);

module.exports = router;
