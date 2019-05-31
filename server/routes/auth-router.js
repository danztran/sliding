const router 	= require('express').Router();
const authCtrl = requireWrp('controllers/auth-controller');

router.get('/info', authCtrl.info);
router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout);

module.exports = router;
