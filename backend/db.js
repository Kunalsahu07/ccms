const mariadb = require('mariadb');

// const pool = mariadb.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'kunal123',
//     database: 'ccms1',
//     multipleStatements: true,
// });

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    multipleStatements: true,
});

module.exports = pool;