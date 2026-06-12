const redisClient = require('../redis');

const buildCacheKey = (req) => {
    const dept_id = req.params.dept_id || 'all';
    const reg_year = req.params.reg_year || null;
    const pend_disp = req.params.pend_disp || null;

    const routeName = req.path.split('/')[1];

    let key = `ccms:${routeName}:dept:${dept_id}`;

    if (pend_disp) key += `:pd:${pend_disp}`;
    if (reg_year) key += `:year:${reg_year}`;

    return key;
};

const cacheMiddleware = (ttl = 300) => {
    return async (req, res, next) => {
        const cacheKey = buildCacheKey(req);

        try {
            // 1. Check if Redis is connected before using it
            if (!redisClient.isReady) {
                console.warn('Redis not ready, skipping cache');
                return next();
            }

            const cached = await redisClient.get(cacheKey);
            if (cached) {
                console.log(`Cache HIT ⚡ → ${cacheKey}`);
                return res.status(200).json(JSON.parse(cached)); // ✅ added status(200)
            }

            console.log(`Cache MISS 🐢 → ${cacheKey}`);

            // 2. Safely override res.json
            const originalJson = res.json.bind(res);
            res.json = async (data) => {
                try {
                    // ✅ only cache successful responses
                    if (res.statusCode === 200) {
                        await redisClient.set(cacheKey, JSON.stringify(data), { EX: ttl });
                        console.log(`Cached ✅ → ${cacheKey} (${ttl}s)`);
                    }
                } catch (cacheErr) {
                    console.error('Failed to cache:', cacheErr.message); // don't break response
                }
                return originalJson(data); // ✅ always send response
            };

            next();

        } catch (err) {
            console.error('Cache middleware error:', err.message);
            next(); // ✅ if anything fails, just skip cache and continue
        }
    };
};

module.exports = { cacheMiddleware, buildCacheKey };