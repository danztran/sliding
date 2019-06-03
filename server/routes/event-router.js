const router = require('express').Router();
const authMdw = requireWrp('middlewares/auth-middleware');
const eventCtrl = requireWrp('controllers/event-controller');

router.use(authMdw.authen);
router.post('/create', eventCtrl.create);

module.exports = router;
