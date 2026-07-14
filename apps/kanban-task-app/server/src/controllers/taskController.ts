import type { RequestHandler } from 'express';

import type { CreateTaskDTO, UpdateTaskDTO } from '#Types/api.js';

import { Board } from '#Models/boardModel.js';
import AppError from '#Utils/appError.js';
import catchAsync from '#Utils/catchAsync.js';

const createTask: RequestHandler<{ boardId: string; columnId: string }, object, CreateTaskDTO> = catchAsync(
  async (req, res, next) => {
    const { boardId, columnId } = req.params;
    const { title, description, status, subtasks } = req.body;

    const board = await Board.findById(boardId);
    if (!board) return next(new AppError('No document found in DB!', 404));

    const columnIndex = board.columns.findIndex((c) => c._id.toString() === columnId);

    if (columnIndex === -1) return next(new AppError('No document found in DB!', 404));

    try {
      const newTask = { description, status, subtasks, title };
      // eslint-disable-next-line security/detect-object-injection
      board.columns[columnIndex]?.tasks.push(newTask);
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

const updateTask: RequestHandler<{ boardId: string; columnId: string; taskId: string }, object, UpdateTaskDTO> =
  catchAsync(async (req, res, next) => {
    const { boardId, columnId, taskId } = req.params;
    const { title, description, status, subtasks } = req.body;

    const board = await Board.findById(boardId);
    if (!board) return next(new AppError('No document found in DB!', 404));

    try {
      const task = board.columns.id(columnId)?.tasks.id(taskId);

      if (!task) throw new AppError('No task', 404);
      task.set({ description, status, subtasks, title });
      await board.save();
    } catch {
      return next(new AppError('Unable to commit document!', 404));
    }

    res.status(200).json({
      data: { data: board },
      results: 1,
      status: 'success',
    });
  });

const deleteTask: RequestHandler<{ boardId: string; columnId: string; taskId: string }> = catchAsync(
  async (req, res, next) => {
    const { boardId, columnId, taskId } = req.params;

    const board = await Board.findById(boardId);
    if (!board) return next(new AppError('No document found in DB!', 404));

    const column = board.columns.findIndex((c) => c._id.toString() === columnId);

    if (column === -1) return next(new AppError('No document found in DB!', 404));

    try {
      // eslint-disable-next-line security/detect-object-injection
      await board.columns[column]?.tasks.id(taskId)?.remove();
      await board.save();
    } catch {
      return next(new AppError('No document found in DB!', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);

export { createTask, deleteTask, updateTask };
