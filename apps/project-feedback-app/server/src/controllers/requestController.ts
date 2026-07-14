/* eslint-disable unicorn/prefer-object-from-entries */
import type { NextFunction, Request, RequestHandler, Response } from 'express';

import type { ICommentHydrated, ICommentPopulateUser } from '#Models/CommentModel.js';

import type { CreateRequestRequestDTO, UpdateRequestDTO } from '../types/api.js';

import CommentModel from '#Models/CommentModel.js';
import RequestModel from '#Models/RequestModel.js';
import UserModel from '#Models/UserModel.js';
import AppError from '#Utils/appError.js';
import catchAsync from '#Utils/catchAsync.js';
import catchAsyncTransaction from '#Utils/catchAsyncTransaction.js';

const getAllRequests = catchAsync(async (_req, res, next) => {
  const requests = await RequestModel.find({});

  if (requests.length === 0) return next(new AppError('No documents found', 404));

  return res.status(200).json({
    data: {
      requests,
    },
    results: requests.length,
    status: 'success',
  });
});

const getRequest: RequestHandler<{ id: string }> = catchAsync(async (req, res, next) => {
  const request = await RequestModel.findById(req.params['id']);

  if (!request) return next(new AppError('No document found with that ID', 404));

  return res.status(200).json({
    status: 'success',
    data: {
      request,
    },
  });
});

const createRequest: RequestHandler<object, object, CreateRequestRequestDTO> = catchAsync(async (req, res, _next) => {
  const { title, category, description } = req.body;

  if (!title || !category || !description) throw new AppError('Invalid submission structure', 400);

  const request = await RequestModel.create({ category, description, title });

  return res.status(201).json({
    status: 'success',
    data: {
      request,
    },
  });
});

const updateRequest: RequestHandler<{ id: string }, object, UpdateRequestDTO> = catchAsync(async (req, res, next) => {
  const { title, category, status, description } = req.body;

  if (!title || !category || !status || !description) throw new AppError('Invalid submission structure', 400);

  const request = await RequestModel.findByIdAndUpdate(
    req.params['id'],
    { category, description, status, title },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!request) return next(new AppError('No document found with that ID', 404));

  return res.status(200).json({
    status: 'success',
    data: {
      request,
    },
  });
});

// TODO:  Need to delete all associated comments and find user upvotes and remove.
const deleteRequest: RequestHandler<{ id: string }> = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const request = await RequestModel.findByIdAndDelete(req.params['id']);

    if (!request) return next(new AppError('No document found with that ID', 404));

    return res.status(204).json({
      status: 'success',
      data: undefined,
    });
  }
);

// NOTE:  Could refactor this; responseCommentObject to array?
const getAllRequestComments: RequestHandler<{ id: string }> = catchAsync(async (req, res, _next) => {
  const requestId = req.params['id'];
  const comments = await CommentModel.find({ requestId }, ' -requestId -created -__v').populate<ICommentPopulateUser>(
    'user',
    'name username photo -_id'
  );

  interface IResObj {
    [key: string]: ICommentHydrated[];
  }

  // Hashmap of all comments. Strucutre: commentid: {comment}
  const allComments: { [key: string]: ICommentHydrated } = comments.reduce(
    (acc, cur) => ({ ...acc, [cur._id]: cur }),
    {}
  );

  // Create object of arrays which hold all comments tied to a root comment
  const responseCommentsObject: IResObj = {};
  comments.forEach((el) => {
    const rootCommentId = el.parents[0]?.toString();
    if (rootCommentId && !(rootCommentId in responseCommentsObject)) responseCommentsObject[`${rootCommentId}`] = [];
    responseCommentsObject[`${rootCommentId}`]?.push(el);
  });

  // Sort each array so most deeply nested comments are first, root last
  Object.keys(responseCommentsObject).forEach((el) => {
    responseCommentsObject[`${el}`]?.sort((a, b) => {
      if (a.parents.length < b.parents.length) return 1;
      if (a.parents.length > b.parents.length) return -1;
      return 0;
    });
  });

  // Iterate over comments and build up the reply chain
  Object.keys(responseCommentsObject).forEach((el) => {
    responseCommentsObject[`${el}`]?.forEach((comment) => {
      // Ignore Root
      if (comment.parents.length > 1) {
        // eslint-disable-next-line unicorn/prefer-at
        const parentId = comment.parents[comment.parents.length - 2]!;
        const parentComment = allComments[`${parentId.toString()}`];

        if (parentComment) {
          if (!parentComment.replies) {
            parentComment.replies = [];
          }

          const { username: replyingTo } = parentComment.user;
          const { user, content, replies, _id: id } = comment;

          parentComment.replies.push({
            id,
            content,
            replies,
            replyingTo,
            user,
          });
        }
      }
    });
  });

  // Return formatted root comments only
  const resComments = Object.keys(responseCommentsObject).map((el) => {
    // eslint-disable-next-line security/detect-object-injection
    const group = responseCommentsObject[el];

    if (!group || group.length === 0) {
      return;
    }

    // eslint-disable-next-line unicorn/prefer-at
    const rootComment = group[group.length - 1];
    if (!rootComment) return;
    const { user, content, replies, _id } = rootComment;
    return { _id, content, replies, user };
  });

  return res.status(200).json({
    data: {
      resComments,
    },
    results: comments.length,
    status: 'success',
  });
});

const updateRequestUpvote: RequestHandler<{ id: string }> = catchAsync(async (req, res, next) => {
  const { id: requestId } = req.params;
  const { userId } = req.query;

  await catchAsyncTransaction(async (_req, res, _next, session) => {
    const userDoc = await UserModel.findById(userId, undefined, { session });

    if (!userDoc) throw new AppError('Could not find comment with that ID', 404);

    const { upvotes } = userDoc;

    // If user has already voted on this request
    if (upvotes.some((el) => el.toString() === requestId)) {
      return res.status(200).json({
        status: 'success',
        data: { request: 'duplicate upvote' },
      });
    }

    const userDocUpdated = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { upvotes: requestId } },
      { session }
    );

    if (!userDocUpdated) throw new AppError('Could not find user with that ID', 404);

    const requestDoc = await RequestModel.findByIdAndUpdate(
      requestId,
      { $inc: { upvotes: 1 } },
      { new: true, session }
    );

    return res.status(200).json({
      status: 'success',
      data: {
        request: requestDoc,
      },
    });
  })(req, res, next);
});

export {
  createRequest,
  deleteRequest,
  getAllRequestComments,
  getAllRequests,
  getRequest,
  updateRequest,
  updateRequestUpvote,
};
