import type { IBoard } from '@apps/kanban-task-app-shared';

export interface IAllBoardsResponseDTO {
  data: IBoard[] | [];
}

export interface IBoardResponseDTO {
  data: IBoard;
}
