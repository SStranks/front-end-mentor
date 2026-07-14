import type { RequestHandler } from 'express';

import { createOne, deleteOne, getAll, getOne, updateOne } from '#Config/dbHandlers.js';
import { Board } from '#Models/boardModel.js';

const getBoard: RequestHandler = getOne(Board);

const getAllBoards: RequestHandler = getAll(Board);

const createBoard: RequestHandler = createOne(Board);

const updateBoard: RequestHandler = updateOne(Board);

const deleteBoard: RequestHandler = deleteOne(Board);

export { createBoard, deleteBoard, getAllBoards, getBoard, updateBoard };
