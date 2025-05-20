import cors from 'cors';
import path from 'node:path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import authRouter from './routes/authRouter';
import taskRouter from './routes/taskRouter';
import boardRouter from './routes/boardRouter';
import columnRouter from './routes/columnRouter';
import supportRouter from './routes/supportRouter';
import pingRouter from './routes/pingRouter';

import { env } from './helpers/env';
import HttpError from './helpers/HttpError';
import swaggerSpec from './helpers/swagger';

import { NextFunction, Request, Response } from 'express';

const publicDirPath = path.resolve('src', 'public');

dotenv.config();

const startServer = async () => {
  const PORT = env('PORT');
  const FRONTEND_URL = env('FRONTEND_URL');
  const BASE_URL = env('BASE_URL');

  const app = express();

  // Enhanced CORS configuration for Google OAuth
  const corsOptions = {
    origin: [
      FRONTEND_URL,
      BASE_URL,
      'https://accounts.google.com', // Google OAuth domain
      'https://www.googleapis.com'  // Google API domain
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin'
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
    maxAge: 86400 // 24 hours
  };

  // Apply CORS middleware
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

  app.use(express.static(publicDirPath));
  app.use(morgan('tiny'));
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Routes
  app.use('/', pingRouter); 
  app.use('/api/auth', authRouter);
  app.use('/api', taskRouter);
  app.use('/api', columnRouter);
  app.use('/api', boardRouter);
  app.use('/api/support', supportRouter);

  // Error handling
  app.use((_, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.error('Server error:', err);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  });

  // Security headers middleware
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', corsOptions.origin.join(', '));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend URL: ${FRONTEND_URL}`);
    console.log(`Base URL: ${BASE_URL}`);
    console.log('CORS configured for origins:', corsOptions.origin);
  });
};

export default startServer;