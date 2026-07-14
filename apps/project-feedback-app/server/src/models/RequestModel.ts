import mongoose from 'mongoose';

interface IRequest {
  category: string;
  comments: mongoose.Types.ObjectId[];
  description: string;
  status: string;
  title: string;
  totalComments: number;
  upvotes: number;
}

const requestSchema = new mongoose.Schema<IRequest>(
  {
    category: {
      enum: ['ui', 'ux', 'enhancement', 'bug', 'feature'],
      lowercase: true,
      required: true,
      type: String,
    },
    comments: [
      {
        ref: 'Comment',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    description: {
      maxlength: [250, 'Description can be no longer than 250 characters'],
      required: true,
      trim: true,
      type: String,
    },
    status: {
      default: 'suggestion',
      enum: ['suggestion', 'planned', 'in-progress', 'live'],
      lowercase: true,
      type: String,
    },
    title: {
      maxlength: [75, 'Title can be no longer than 75 characters'],
      required: true,
      trim: true,
      type: String,
    },
    totalComments: {
      default: 0,
      type: Number,
    },
    upvotes: {
      default: 0,
      type: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

requestSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
