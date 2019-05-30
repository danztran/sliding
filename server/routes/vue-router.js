const router = require('express').Router();

const vueMain = `${process.env.VUE_DIST}/index.html`;

/* GET home page. */
router.get('/*', (req, res, next) => {
	if (req.xhr) return next();
	return res.sendFile(vueMain, { root: './' });
});

module.exports = router;
