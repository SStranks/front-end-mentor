import type { Model } from 'mongoose';

import type { ISubTask, ITask } from '#Shared/types.d.ts';

import mongoose from 'mongoose';

interface ITaskDocumentOverrides {
  subtasks: ISubTask[];
}

type TTaskModel = Model<ITask, object, ITaskDocumentOverrides>;

const subtaskSchema = new mongoose.Schema<ISubTask>({
  isCompleted: { default: false, required: true, type: 'Boolean' },
  title: {
    maxLength: 100,
    required: true,
    trim: true,
    type: 'String',
  },
});

const taskSchema = new mongoose.Schema<ITask, TTaskModel>({
  description: { maxLength: 280, trim: true, type: 'String' },
  status: { required: true, type: 'String' },
  subtasks: [{ required: false, type: subtaskSchema }],
  title: {
    maxLength: 100,
    required: true,
    trim: true,
    type: 'String',
  },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export type { TTaskModel };
export { Task, taskSchema };
