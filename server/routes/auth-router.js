const router 	= require('express').Router();
const AuthCtlr = requireWrp('controllers/auth-controller');
const AuthMdw = requireWrp('middlewares/auth-middleware');

router.get('/info', AuthCtlr.info);
router.post('/signup', AuthCtlr.signup);
router.post('/quick-signup', AuthCtlr.quickSignup);
router.post('/login', AuthCtlr.login);
router.get('/logout', AuthCtlr.logout);

router.use(AuthMdw.authen);
router.patch('/update', AuthCtlr.update);

module.exports = router;
