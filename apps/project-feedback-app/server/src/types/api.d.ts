import type { Types } from 'mongoose';

import type { IComment } from '#Models/CommentModel.ts';

export interface CreateRequestRequestDTO {
  category: string;
  description: string;
  title: string;
}

export interface UpdateRequestDTO {
  category: string;
  description: string;
  status: string;
  title: string;
}

export interface CreateCommentDTO {
  content: IComment['content'];
  user: Types.ObjectId;
}

export interface UpdateCommentDTO {
  content: IComment['content'];
}
