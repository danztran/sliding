const { Pool } = require('pg');
const pool = new Pool({
	ssl: true
});

module.exports = pool;
