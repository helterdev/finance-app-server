import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import auth from './routes/auth.routes';

dotenv.config();

const app: express.Application = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/v1/auth', auth);

export default app;
