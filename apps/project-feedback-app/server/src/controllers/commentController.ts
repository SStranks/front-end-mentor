import type { RequestHandler } from 'express';
import type { Types } from 'mongoose';

import type { CreateCommentDTO, UpdateCommentDTO } from '../types/api.js';

import mongoose from 'mongoose';

import CommentModel from '#Models/CommentModel.js';
import RequestModel from '#Models/RequestModel.js';
import AppError from '#Utils/appError.js';
import catchAsync from '#Utils/catchAsync.js';
import withTransaction from '#Utils/withTransaction.js';

const createComment: RequestHandler<object, object, CreateCommentDTO> = catchAsync(async (req, res, next) => {
  // If no commentId is specified on req.query then it is a root comment, otherwise it is a reply to comment
  const { request: requestId, comment: commentId } = req.query;
  const { user, content } = req.body;
  const commentData = { content, requestId, user };

  if (!commentId) {
    // Find request document; add the new comment ID to request document comment[].
    const comment = await withTransaction(async (session) => {
      const commentDoc = await CommentModel.create([commentData], {
        session,
      });

      if (!commentDoc[0]) throw new AppError('Server Error', 500);

      const updateField = {
        $inc: { totalComments: 1 },
        $push: { comments: commentDoc[0]._id as Types.ObjectId },
      };

      await RequestModel.findByIdAndUpdate(requestId, updateField, {
        session,
      });

      return commentDoc;
    });

    return res.status(201).json({
      status: 'success',
      data: {
        comment,
      },
    });
  }

  if (commentId) {
    // Find comment document; copy comment.parents[] and merge it with new comment properties.
    const comment = await withTransaction(async (session) => {
      const commentParent = await CommentModel.findById(commentId, undefined, {
        session,
      });

      let parents;
      if (commentParent) {
        ({ parents } = commentParent);
      } else {
        return next(new AppError('Could not find comment with that ID', 404));
      }

      const newObjId = new mongoose.Types.ObjectId();
      parents.push(newObjId);
      const commentFields = { ...commentData, _id: newObjId, parents };
      const commentDoc = await CommentModel.create([commentFields], {
        session,
      });

      const updateField = {
        $inc: { totalComments: 1 },
      };
      await RequestModel.findByIdAndUpdate(requestId, updateField, {
        session,
      });

      return commentDoc;
    });

    return res.status(201).json({
      status: 'success',
      data: {
        comment,
      },
    });
  }

  return next(new AppError('Query parameters were expected', 404));
});

const updateComment: RequestHandler<{ id: string }, object, UpdateCommentDTO> = catchAsync(async (req, res, next) => {
  const { content } = req.body;
  const comment = await CommentModel.findByIdAndUpdate(
    req.params['id'],
    { content },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!comment) return next(new AppError('Could not find document with that ID', 404));

  return res.status(200).json({
    status: 'success',
    data: {
      comment,
    },
  });
});

export { createComment, updateComment };
