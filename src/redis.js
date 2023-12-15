const Redis = require('ioredis');

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
});

// Export the Redis client to be used in other modules
module.exports = redisClient;