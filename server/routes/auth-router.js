const router 	= require('express').Router();
const AuthCtlr = requireWrp('controllers/auth-controller');

router.get('/info', AuthCtlr.info);
router.post('/signup', AuthCtlr.signup);
router.post('/login', AuthCtlr.login);
router.post('/profile', AuthCtlr.profile);
router.get('/logout', AuthCtlr.logout);

module.exports = router;
