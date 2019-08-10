const router = require('express').Router();
const AuthMdw = requireWrp('middlewares/auth-middleware');
const EventCtlr = requireWrp('controllers/event-controller');

router.get('/find', EventCtlr.find);

router.use(AuthMdw.authen);
router.get('/query', EventCtlr.query);
router.post('/create', EventCtlr.create);

module.exports = router;
