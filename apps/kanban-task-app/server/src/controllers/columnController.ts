import type { RequestHandler } from 'express';

import type { CreateColumnDTO, UpdateColumnDTO } from '#Types/api.js';

import { Board } from '#Models/boardModel.js';
import AppError from '#Utils/appError.js';
import catchAsync from '#Utils/catchAsync.js';

// NOTE:  Currently not being utilized - 'new column' uses the 'board edit' modal.
const createColumn: RequestHandler<{ boardId: string }, object, CreateColumnDTO> = catchAsync(
  async (req, res, next) => {
    const { boardId } = req.params;

    let board = await Board.findById(boardId);
    if (!board) return next(new AppError('No document found in DB!', 404));

    try {
      board.columns.push(req.body);
      board = await board.save();
    } catch {
      return next(new AppError('Unable to commit document', 404));
    }

    res.status(201).json({
      data: { board },
      results: 1,
      status: 'success',
    });
  }
);

// For moving a task from one column to another.
const updateColumn: RequestHandler<{ boardId: string; columnId: string }, object, UpdateColumnDTO> = catchAsync(
  async (req, res, next) => {
    // NOTE:  In FE API call: req.body; the task, and column to move to.
    const { boardId, columnId } = req.params;
    const { newColumnId, taskId, newTask } = req.body;

    const board = await Board.findById(boardId);
    if (!board) return next(new AppError('No document found in DB!', 404));

    try {
      const task = board.columns.id(columnId)?.tasks.id(taskId);
      if (!task) throw new AppError('No task', 404);

      board.columns.id(columnId)?.tasks.pull(task);
      board.columns.id(newColumnId)?.tasks.push(newTask);
      await board.save();
    } catch {
      return next(new AppError('Unable to commit document', 404));
    }

    res.status(201).json({
      data: { data: board },
      results: 1,
      status: 'success',
    });
  }
);

const deleteColumn: RequestHandler<{ boardId: string; columnId: string }> = catchAsync(async (req, res, next) => {
  const { boardId, columnId } = req.params;

  const board = await Board.findById(boardId);
  if (!board) return next(new AppError('No document found in DB!', 404));

  try {
    void board.columns.id(columnId)?.remove();
    await board.save();
  } catch {
    return next(new AppError('No document found in DB!', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export { createColumn, deleteColumn, updateColumn };
