const router = require('express').Router();
const AuthMdw = requireWrp('middlewares/auth-middleware');
const EventCtlr = requireWrp('controllers/event-controller');

router.use(AuthMdw.authen);
router.post('/create', EventCtlr.create);

module.exports = router;
