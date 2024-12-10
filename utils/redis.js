import * as redis from 'redis';

// Simple Redis class to use with the file manager
class RedisClient {
  constructor() {
    this.client = redis.createClient({
      url: 'redis://localhost:6379'
    });
    this.client.on('connect', () => /*console.log('Client connected')*/ true);
    this.client.on('error', (err) => console.log('Not connected Client'));

    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
    } catch (err) {
      console.log("Connexion error");
    }
  }

// Method to verify if a connection is still alive
  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    if (this.isAlive()) {
      const value = await this.client.get(key)
      return value;
    }
  }

  async set(key, value) {
    if (this.isAlive()) {
      await this.client.set(key, value);
    }
  }

  async del(key) {
    if (this.isAlive()) {
      await this.client.del(key);
    }
  }
}


const redisClient = new RedisClient();
export default redisClient;

// console.log("Same page : ", redisClient.isAlive());
