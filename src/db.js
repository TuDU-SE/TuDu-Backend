const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "db",
    port: 5432,
    database: "postgres"

});

module.exports = pool;
