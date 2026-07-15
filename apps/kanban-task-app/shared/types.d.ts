export interface ISubTask {
  _id: string;
  isCompleted: boolean;
  title: string;
}

export interface ITask {
  _id: string;
  description: string;
  status: string;
  subtasks: ISubTask[];
  title: string;
}

export interface IColumn {
  _id: string;
  name: string;
  tasks: ITask[];
}

export interface IBoard {
  _id: string;
  columns: IColumn[];
  name: string;
}
