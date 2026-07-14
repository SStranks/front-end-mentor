import type { Application, NextFunction, Request, Response } from 'express';

import cors from 'cors';
import express from 'express';

import globalErrorHandler from '#Controllers/errorController.js';
import boardRouter from '#Routes/boardRoutes.js';
import AppError from '#Utils/appError.js';

const app: Application = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/boards', boardRouter);

// Error Handler
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
