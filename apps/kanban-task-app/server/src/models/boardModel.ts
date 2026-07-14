import type { Model, Types } from 'mongoose';

import type { IColumnDocumentOverrides } from '#Models/columnModel.js';
import type { IBoard, IColumn } from '#Shared/types.d.ts';

import mongoose from 'mongoose';

import { columnSchema } from '#Models/columnModel.js';

// https://mongoosejs.com/docs/typescript/subdocuments.html
interface BoardDocumentOverrides {
  columns: Types.DocumentArray<IColumn & IColumnDocumentOverrides>;
}

type TBoardModel = Model<IBoard, object, BoardDocumentOverrides>;

const boardSchema = new mongoose.Schema<IBoard, TBoardModel>({
  columns: [{ required: false, type: columnSchema }],
  name: {
    maxLength: 30,
    required: true,
    trim: true,
    type: 'String',
  },
});

const Board = mongoose.model<IBoard, TBoardModel>('Board', boardSchema);

export { Board };
