import type { Model, Types } from 'mongoose';

import type { IColumn, ITask } from '#Shared/types.d.ts';

import mongoose from 'mongoose';

import { taskSchema } from '#Models/taskModel.js';

export interface IColumnDocumentOverrides {
  tasks: Types.DocumentArray<ITask>;
}

type TColumnModel = Model<IColumn, object, IColumnDocumentOverrides>;

const columnSchema = new mongoose.Schema<IColumn, TColumnModel>({
  name: {
    maxLength: 30,
    required: true,
    trim: true,
    type: 'String',
  },
  tasks: [{ required: false, type: taskSchema }],
});

export type { TColumnModel };
export { columnSchema };
