import dotenv from 'dotenv';

dotenv.config();

const accessenv = {
  PORT: process.env.PORT!,
  DATABASE: process.env.DATABASE!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  URL: process.env.DEV_CALLBACK_URL!,
  SECRET_KEY: process.env.SECRET_KEY!,
};

export default accessenv;
