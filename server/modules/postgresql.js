const { Pool } = require('pg');
const pool = new Pool({
	ssl: true
});

pool.query('SELECT NOW()', (err, res) => {
	console.warn(err || res.rows[0].now);
});

module.exports = pool;
