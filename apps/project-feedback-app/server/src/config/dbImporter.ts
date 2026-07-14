/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable unicorn/text-encoding-identifier-case */
/* eslint-disable unicorn/no-process-exit */

import type { Model } from 'mongoose';

import inquirer from 'inquirer';
import mongoose from 'mongoose';

import { connectDB } from '#Config/db.js';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type TJson = {
  [key: string]: any;
};

interface MongooseModelModule {
  default: Model<any>;
}

interface InquirerPrompt1 {
  operation: string;
}

interface InquirerPrompt2 {
  json: string;
  model: string;
}

interface InquirerPrompt3 {
  model: string;
}

// ----------------------------- //
// ------- DBIMPORTER v1 ------- //
// ----------------------------- //

// Set the directory for the JSON data; jsonDirectoryPath
// Set the directory for the Models data; modelsDirectoryPath
// Run on Node server: npx ts-node path/dbImporter.ts

// Set directory for the JSON data files
const filenamePath = fileURLToPath(import.meta.url);
const dirnamePath = path.dirname(filenamePath);
const jsonDirectoryPath = path.join(dirnamePath, '..', 'dev-data');
const modelsDirectoryPath = path.join(dirnamePath, '..', 'models');

// Import data to MongoDB: Accepts Mongoose Model and JSON (expects array of obj)
const importData = async (model: Model<any>, data: TJson) => {
  try {
    await model.create(data);
    console.log('SUCCESS: Data transferred to DB');
  } catch (error) {
    console.log('ERROR: Could not transfer data to DB');
    console.log(error);
  }
  // eslint-disable-next-line n/no-process-exit
  process.exit();
};

// Get JSON and Model file names - users selects one of each (linked).
async function importProcess() {
  const jsonFileNames = fs.readdirSync(jsonDirectoryPath);
  const modelFileNames = fs.readdirSync(modelsDirectoryPath);

  return inquirer
    .prompt<InquirerPrompt2>([
      {
        choices: jsonFileNames,
        message: 'Please select the JSON data file',
        name: 'json',
        type: 'list',
      },
      {
        choices: modelFileNames,
        message: 'Please select the associated Model file',
        name: 'model',
        type: 'list',
      },
    ])
    .then(async (answer) => {
      // Parse JSON. Import Model File. Import data.
      const jsonData = JSON.parse(fs.readFileSync(path.join(jsonDirectoryPath, answer.json), 'utf-8')) as Record<
        string,
        unknown
      >;
      const { default: model } = (await import(path.join(modelsDirectoryPath, answer.model))) as MongooseModelModule;
      void importData(model, jsonData);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Delete data from MongoDB: Accepts Mongoose Model
const deleteData = async (model: Model<any>) => {
  try {
    await model.deleteMany();
    console.log('SUCCESS: Data deleted from DB');
  } catch {
    console.log('ERROR: Could not delete data from DB');
  }
  // eslint-disable-next-line n/no-process-exit
  process.exit();
};

// Get Model filenames - user selects one. Import that Model and delete data based on that Model.
async function deleteProcess() {
  const modelFileNames = fs.readdirSync(modelsDirectoryPath);

  return inquirer
    .prompt<InquirerPrompt3>([
      {
        choices: modelFileNames,
        message: 'Please select the model file',
        name: 'model',
        type: 'list',
      },
    ])
    .then(async (answer) => {
      const { default: model } = (await import(path.join(modelsDirectoryPath, answer.model))) as MongooseModelModule;
      await deleteData(model);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Inquirer CLI Entry Point
const inquirerProcess = async () => {
  return inquirer
    .prompt<InquirerPrompt1>([
      {
        choices: ['Import', 'Delete'],
        message: 'Do you wish to import or delete data?',
        name: 'operation',
        type: 'list',
      },
    ])
    .then(async (answer) => {
      if (answer.operation === 'Import') await importProcess();
      if (answer.operation === 'Delete') await deleteProcess();
    })
    .catch((error: Error) => {
      if ('isTtyError' in error) {
        console.log(error);
      } else {
        console.log(error);
      }
    });
};

// Connect to DB
await connectDB();

// Once DB established successfully run Inquirer
mongoose.connection.on('connected', () => {
  void inquirerProcess();
});
