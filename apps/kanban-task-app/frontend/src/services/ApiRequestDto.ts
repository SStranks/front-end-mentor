import type { IColumn, ITask, ISubTask } from '#Shared/types';

export interface IPostBoardRequestDTO {
  name: string;
  columns: Omit<IColumn, '_id' | 'tasks'>[];
}

export interface IPatchBoardRequestDTO {
  name: string;
  columns: Omit<IColumn, '_id' | 'tasks'>[];
}

export interface IPostTaskRequestDTO {
  title: string;
  description: string;
  status: string;
  subtasks: ISubTask[];
}

export interface IPatchTaskRequestDTO {
  title: string;
  description: string;
  status: string;
  subtasks: ISubTask[];
}

export interface IPatchTaskColumnRequestDTO {
  taskId: string;
  newColumnId: string;
  newTask: ITask;
}
