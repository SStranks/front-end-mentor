import type { NextFunction, Request, Response } from 'express';
import type { ClientSession } from 'mongoose';

import { mongooseConnection } from '#Config/db.js';

const catchAsyncTransaction = <T>(
  fn: (req: Request, res: Response, next: NextFunction, session: ClientSession) => Promise<T>
) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const session = await mongooseConnection.startSession();
    try {
      session.startTransaction();

      const value = await fn(req, res, next, session);

      await session.commitTransaction();

      return value;
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      await session.endSession();
    }

    return true;
  };
};

export default catchAsyncTransaction;
