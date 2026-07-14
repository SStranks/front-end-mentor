import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { Model } from 'mongoose';

import AppError from '#Utils/appError.js';
import catchAsync from '#Utils/catchAsync.js';

const getOne = <T>(Model: Model<T>): RequestHandler =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // TODO:  This isn't generic - need to account for different IDs
    const doc = await Model.findById(req.params['boardId']);

    if (!doc) return next(new AppError('No documents found in DB!', 404));

    res.status(200).json({
      data: {
        data: doc,
      },
      results: 1,
      status: 'success',
    });
  });

const getAll = <T>(Model: Model<T>): RequestHandler =>
  catchAsync(async (_req: Request, res: Response, next: NextFunction) => {
    const docs = await Model.find({});

    if (docs.length === 0) return next(new AppError('No documents found in DB!', 404));

    console.log(docs);

    res.status(200).json({
      data: {
        data: docs,
      },
      results: docs.length,
      status: 'success',
    });
  });

const createOne = <T>(Model: Model<T>): RequestHandler =>
  catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      data: {
        data: doc,
      },
      results: 1,
      status: 'success',
    });
  });

const deleteOne = <T>(Model: Model<T>): RequestHandler =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // TODO:  This isn't generic - need to account for different IDs
    const doc = await Model.findByIdAndDelete(req.params['boardId']);

    if (!doc) return next(new AppError('No document found with matching ID', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

// const updateOne = <T>(Model: Model<T>): RequestHandler =>
//   catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     // TODO:  This isn't generic - need to account for different IDs
//     const doc = await Model.findByIdAndUpdate(req.params['boardId'], req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!doc) {
//       return next(new AppError('No document found with that ID', 404));
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         data: doc,
//       },
//     });
//   });

export { createOne, deleteOne, getAll, getOne };
