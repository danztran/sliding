const router = require('express').Router();
const LimitMdw = requireWrp('middlewares/api-limit-middleware');
const AuthMdw = requireWrp('middlewares/auth-middleware');
const AuthCtlr = requireWrp('controllers/auth-controller');
const APIHandler = requireWrp('handlers/api-handler');

router.get('/info', APIHandler(AuthCtlr.info));
router.post('/signup', LimitMdw.signup, APIHandler(AuthCtlr.signup));
router.post('/quick-signup', LimitMdw.quickSignup, APIHandler(AuthCtlr.quickSignup));
router.post('/login', LimitMdw.login, AuthCtlr.login);
router.get('/logout', AuthCtlr.logout);

// outlook auth
router.get('/outlook', AuthCtlr.loginOutlook);
router.get('/outlook/callback', AuthMdw.outlookCallback, AuthCtlr.loginOutlookSuccess);

router.use(AuthMdw.authen);
router.patch('/update', AuthCtlr.update);
router.patch('/complete-signup', APIHandler(AuthCtlr.completeSignup));

module.exports = router;
