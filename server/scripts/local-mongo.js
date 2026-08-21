import { MongoMemoryServer } from 'mongodb-memory-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../.local-mongo-data');

const mongod = await MongoMemoryServer.create({
  instance: {
    port: 27117,
    dbPath,
    storageEngine: 'wiredTiger',
  },
});

console.log('LOCAL_MONGO_READY', mongod.getUri());

process.on('SIGINT', async () => {
  await mongod.stop();
  process.exit(0);
});
