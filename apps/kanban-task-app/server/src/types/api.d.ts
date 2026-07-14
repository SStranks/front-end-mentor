import type { ITask } from '#Shared/types.js';

export interface CreateTaskDTO {
  description: string;
  status: string;
  subtasks: string[];
  title: string;
}

export interface UpdateTaskDTO {
  description: string;
  status: string;
  subtasks: string[];
  title: string;
}

export interface CreateColumnDTO {
  name: string;
}

export interface UpdateColumnDTO {
  newColumnId: string;
  newTask: ITask;
  taskId: string;
}
