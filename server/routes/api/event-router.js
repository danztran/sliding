const router = require('express').Router();
const AuthMdw = requireWrp('middlewares/auth-middleware');
const EventCtlr = requireWrp('controllers/event-controller');
const APIHandler = requireWrp('handlers/api-handler');

router.get('/find', APIHandler(EventCtlr.find));

router.use(AuthMdw.authen);
router.get('/query', APIHandler(EventCtlr.query));
router.post('/create', APIHandler(EventCtlr.create));

module.exports = router;
