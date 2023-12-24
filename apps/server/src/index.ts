import { connectDB } from './database/database';
import dotenvSafe from 'dotenv-safe';
import { createServer } from 'http';
import app from './app';
import path from 'path';

(async () => {
  const cwd = process.cwd();

  const root = path.join.bind(cwd);
  dotenvSafe.config({
    path: root('.env'),
    sample: root('.env.example')
  });
  try {
    connectDB();
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }

  const server = createServer(app.callback());

  server.listen(process.env.PORT, () => {
    console.log('Server running 🚀');
  });
})();
