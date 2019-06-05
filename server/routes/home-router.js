const router = require('express').Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.send(process.env.APP_NAME);
});

module.exports = router;
