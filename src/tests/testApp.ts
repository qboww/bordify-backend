import express from 'express';
import cors from 'cors';
import authRouter from '../routes/authRouter';
import taskRouter from '../routes/taskRouter';
import boardRouter from '../routes/boardRouter';
import columnRouter from '../routes/columnRouter';
import supportRouter from '../routes/supportRouter';
import { env } from '../helpers/env';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../helpers/swagger';
import HttpError from '../helpers/HttpError';
import path from 'node:path';
import morgan from 'morgan';
import { Request, Response, NextFunction } from 'express';

const publicDirPath = path.resolve('src', 'public');
const FRONTEND_URL = env('FRONTEND_URL');
const BASE_URL = env('BASE_URL');

const app = express();

const corsOptions = {
  origin: [FRONTEND_URL, BASE_URL],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static(publicDirPath));
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRouter);
app.use('/api', taskRouter);
app.use('/api', columnRouter);
app.use('/api', boardRouter);
app.use('/api/support', supportRouter);

// 404 + error
app.use((_: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
  });
  
  app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.statusCode || 500).json({ message: err.message });
  });

export default app;
