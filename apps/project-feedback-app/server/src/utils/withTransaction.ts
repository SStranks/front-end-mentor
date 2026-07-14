import type { ClientSession } from 'mongoose';

import { mongooseConnection } from '#Config/db.js';

const withTransaction = async <T>(fn: (session: ClientSession) => Promise<T>): Promise<T> => {
  const session = await mongooseConnection.startSession();

  try {
    session.startTransaction();

    const value = await fn(session);

    await session.commitTransaction();

    return value;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export default withTransaction;
