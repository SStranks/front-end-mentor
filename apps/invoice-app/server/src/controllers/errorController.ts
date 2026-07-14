/* eslint-disable unicorn/numeric-separators-style */
import type { ErrorRequestHandler, Request, Response } from 'express';
import type mongoose from 'mongoose';

import { MongoError } from 'mongodb';
import { MongooseError } from 'mongoose';

import AppError from '#Utils/appError.js';

type ValidationError = mongoose.Error.ValidationError;
type CastError = mongoose.Error.CastError;

const handleCastErrorDB = (err: CastError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: MongoError) => {
  if (err.errmsg) {
    const value = // eslint-disable-next-line security/detect-unsafe-regex
      (err.errmsg.match(/(["'])(?:\\?.)*?\1/) as Array<string>)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  }
  return new AppError('Error: Duplicate field value; Error handler misconfiguration.', 400);
};

const handleValidationErrorDB = (err: ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el['message']);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    error: err,
    message: err.message,
    stack: err.stack,
    status: err.status,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  // Operational: Error can be safely sent to client.
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Log Error
    console.log('NON OPERATIONAL ERROR:', err);
    // Response
    res.status(500).json({
      status: 'Error',
      message: 'Non-operational error. Contact support',
    });
  }
};

const normalizeError = (error: unknown): AppError => {
  if (error instanceof MongoError && 'code' in error) {
    // eslint-disable-next-line unicorn/no-lonely-if
    if (error.code === 11000) return handleDuplicateFieldsDB(error);
  }
  if (error instanceof MongooseError) {
    if (error.name === 'CastError') return handleCastErrorDB(error as CastError);
    if (error.name === 'ValidationError') return handleValidationErrorDB(error as ValidationError);
  }

  if (error instanceof AppError) return error;

  return new AppError('Unknown error', 500);
};

const globalErrorHandler: ErrorRequestHandler = (error: unknown, _req: Request, res: Response, _next): void => {
  const normalizedError = normalizeError(error);

  if (process.env['NODE_ENV'] === 'development') {
    sendErrorDev(normalizedError, res);
  } else if (process.env['NODE_ENV'] === 'production') {
    sendErrorProd(normalizedError, res);
  }
};

export default globalErrorHandler;
