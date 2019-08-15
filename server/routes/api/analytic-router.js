const router = require('express').Router();
const APIHandler = requireWrp('handlers/api-handler');
const AnalyticCtlr = requireWrp('controllers/analytic-controller');
const AuthMdw = requireWrp('middlewares/auth-middleware');

router.use(AuthMdw.authen);
router.get('/event/:code', APIHandler(AnalyticCtlr.getEventIndicator));

module.exports = router;
