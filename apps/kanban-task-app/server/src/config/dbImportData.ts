/* eslint-disable unicorn/no-process-exit */
/* eslint-disable n/no-process-exit */
import dotenv from 'dotenv';

import connectDB from '#Config/db.js';
import { Board } from '#Models/boardModel.js';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: '../../.env.dev' });

await connectDB();

// JSON Data
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parsedJSON = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'dev-data', 'data.json'), 'utf8')) as Record<
  string,
  unknown
>;
// Format data; from object containing array 'boards' of board objects
const boards = parsedJSON['boards'];

// Import JSON Data
const importData = async () => {
  try {
    await Board.create(boards);
    console.log('SUCCESS: Data transferred to DB');
  } catch (error) {
    console.log('ERROR: Could not transfer data to DB');
    console.log(error);
  }
  process.exit();
};

// Delete JSON Data
const deleteData = async () => {
  try {
    await Board.deleteMany();
    console.log('SUCCESS: Data deleted from DB');
  } catch (error) {
    console.log(error, 'ERROR: Could not delete data from DB');
  }
  process.exit();
};

// Command line operation: 'node dbImportData.ts --operation'
if (process.argv[2] === '--import') {
  await importData();
} else if (process.argv[2] === '--delete') {
  await deleteData();
}
