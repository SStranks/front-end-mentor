import mongoose from 'mongoose';

const { DB_PROTOCOL, DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_ARGS } = process.env;

const MONGO_URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}${DB_ARGS}`;
console.log(`*** ${MONGO_URI}`);
console.log(`*** ${DB_PROTOCOL} *** ${DB_HOST} *** ${DB_DATABASE}`);

const connectDB = async () => {
  await mongoose
    // NOTE:  'useNewUrlParser, etc, are now set to true by default and don't require specifying'.
    .connect(MONGO_URI)
    .then(() => {
      console.log(`*** Connected to database: ${DB_DATABASE} @ ${DB_HOST}`);
    })
    .catch((error) => {
      console.log(`*** ERROR: Cannot connect to database: ${DB_DATABASE} @ ${DB_HOST}`, error);
      // eslint-disable-next-line n/no-process-exit, unicorn/no-process-exit
      process.exit();
    });
};

export default connectDB;
