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
    connectTimeout: 20000,
  
    ssl: {
        rejectUnauthorized: true,
    },
    charset: 'utf8mb4',
    collation: 'utf8mb4_general_ci'
});

module.exports = pool;