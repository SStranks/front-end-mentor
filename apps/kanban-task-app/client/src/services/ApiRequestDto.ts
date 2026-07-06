import type { IColumn, ISubTask } from '#Shared/types';

// Converts properties of a type to optional.
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

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
  subtasks: Omit<ISubTask, '_id'>[];
}

export interface IPatchTaskRequestDTO {
  title: string;
  description: string;
  status: string;
  subtasks: Optional<ISubTask, '_id'>[];
}

export interface IPatchTaskColumnRequestDTO {
  taskId: string;
  newColumnId: string;
  newTask: IPatchTaskRequestDTO;
}
