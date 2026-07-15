import type { IColumn, ISubTask } from '@apps/kanban-task-app-shared';

// Converts properties of a type to optional.
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface IPostBoardRequestDTO {
  columns: Omit<IColumn, '_id' | 'tasks'>[];
  name: string;
}

export interface IPatchBoardRequestDTO {
  columns: Omit<IColumn, '_id' | 'tasks'>[];
  name: string;
}

export interface IPostTaskRequestDTO {
  description: string;
  status: string;
  subtasks: Omit<ISubTask, '_id'>[];
  title: string;
}

export interface IPatchTaskRequestDTO {
  description: string;
  status: string;
  subtasks: Optional<ISubTask, '_id'>[];
  title: string;
}

export interface IPatchTaskColumnRequestDTO {
  newColumnId: string;
  newTask: IPatchTaskRequestDTO;
  taskId: string;
}
