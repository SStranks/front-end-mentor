import type { Document, Types } from 'mongoose';

import { model, Schema } from 'mongoose';

export interface ICommentPopulateUser {
  user: { photo: string; user: string; username: string };
}

export interface IComment extends Document {
  content: string;
  created: Date;
  parents: Types.ObjectId[];
  requestId: string;
  user: Types.ObjectId;
}

export interface ICommentHydrated extends Omit<IComment, 'user'>, ICommentPopulateUser {
  _id: Types.ObjectId;
  replies?: unknown[];
  replyingTo?: string;
}

const commentSchema = new Schema<IComment>(
  {
    content: {
      maxlength: [500, 'Comment can be no longer than 500 characters'],
      minlength: [2, 'Comment must be longer than 2 characters'],
      trim: true,
      type: String,
    },
    created: {
      default: Date.now(),
      type: Date,
    },
    parents: [
      {
        ref: 'Comment',
        type: Schema.Types.ObjectId,
      },
    ],
    requestId: {
      required: true,
      type: String,
    },
    user: {
      ref: 'User',
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// If Root comment; top parent id should be this._id
commentSchema.pre('save', function (next) {
  if (this.parents.length === 0) this.parents.push(this._id as Types.ObjectId);
  next();
});

commentSchema.virtual('replies');
commentSchema.virtual('replyingTo');

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
