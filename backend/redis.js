const { createClient } = require('redis');  // ✅ destructure for v6

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Error:', err));
redisClient.on('connect', () => console.log('Redis Connected'));


module.exports = redisClient;