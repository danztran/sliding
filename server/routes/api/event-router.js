const router = require('express').Router();
const LimitMdw = requireWrp('middlewares/api-limit-middleware');
const AuthMdw = requireWrp('middlewares/auth-middleware');
const EventCtlr = requireWrp('controllers/event-controller');
const APIHandler = requireWrp('handlers/api-handler');

router.get('/find', APIHandler(EventCtlr.find));

router.use(AuthMdw.authen);
router.get('/query', APIHandler(EventCtlr.query));
router.post('/create', LimitMdw.createEvent, APIHandler(EventCtlr.create));

module.exports = router;
