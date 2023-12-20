import dotenvSafe from 'dotenv-safe';
import path from 'path';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example')
});

const env = process.env;

export const database = env.MONGO_URI as string;
export const jwtSecret = env.JWT_SECRET as string;

export const auth = {
  user: env.SMTP_AUTH_USER as string,
  pass: env.SMTP_AUTH_PASS as string
};
export const service = env.EMAIL_SERVICE as string;
