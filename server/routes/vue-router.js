const router = require('express').Router();
const { vueDist, vueMain } = requireWrp('config');

const vuePath = `${vueDist}/${vueMain}`;

/* GET home page. */
router.get('/*', (req, res, next) => {
	if (req.xhr) return next();
	return res.sendFile(vuePath, { root: './' });
});

module.exports = router;
