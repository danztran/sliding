const router = require('express').Router();
const AuthMdw = requireWrp('middlewares/auth-middleware');
const EventRoleCtlr = requireWrp('controllers/event-role-controller');

router.use(AuthMdw.authen);
router.get('/query', EventRoleCtlr.query);
router.patch('/response', EventRoleCtlr.response);

module.exports = router;
