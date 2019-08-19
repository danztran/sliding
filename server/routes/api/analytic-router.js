const router = require('express').Router();
const LimitMdw = requireWrp('middlewares/api-limit-middleware');
const AuthMdw = requireWrp('middlewares/auth-middleware');
const APIHandler = requireWrp('handlers/api-handler');
const AnalyticCtlr = requireWrp('controllers/analytic-controller');

router.use(AuthMdw.authen);
router.get('/event/:code', LimitMdw.analyticEvent, APIHandler(AnalyticCtlr.getEventIndicator));

module.exports = router;
