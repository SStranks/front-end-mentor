// NOTE:  ! This file is not complete. Basic working structure. Depends on backend API types
import type { IBoard } from '@apps/kanban-task-app-shared';

import type { IApiClient } from './ApiHttp';
import type {
  IPatchBoardRequestDTO,
  IPatchTaskColumnRequestDTO,
  IPatchTaskRequestDTO,
  IPostBoardRequestDTO,
  IPostTaskRequestDTO,
} from './ApiRequestDto';
import type { IAllBoardsResponseDTO, IBoardResponseDTO } from './ApiResponseDto';

interface IApiResponse<T> {
  data: T;
  status: string;
  results?: number;
}

export interface IApiServiceClient {
  deleteBoard(boardId: string): Promise<number | boolean>;
  deleteTask(boardId: string, columnId: string, taskId: string): Promise<number | boolean>;
  getAllBoards(): Promise<IBoard[] | undefined>;
  patchBoard(boardId: string, data: IPatchBoardRequestDTO): Promise<IBoard | undefined>;
  patchTask(boardId: string, columnId: string, taskId: string, data: IPatchTaskRequestDTO): Promise<IBoard | undefined>;
  patchTaskColumn(boardId: string, columnId: string, data: IPatchTaskColumnRequestDTO): Promise<IBoard | undefined>;
  postBoard(data: IPostBoardRequestDTO): Promise<IBoard | undefined>;
  postTask(boardId: string, columnId: string, data: IPostTaskRequestDTO): Promise<IBoard | undefined>;
}

export default class ApiServiceClient implements IApiServiceClient {
  ApiServiceClient: IApiClient;

  constructor(ApiClient: IApiClient) {
    this.ApiServiceClient = ApiClient;
  }

  async getAllBoards(): Promise<IBoard[] | undefined> {
    try {
      const response = await this.ApiServiceClient.get<IApiResponse<IAllBoardsResponseDTO>>('/boards');
      const {
        data: { data: responseData },
      } = response;
      return responseData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async postBoard(data: IPostBoardRequestDTO): Promise<IBoard | undefined> {
    try {
      const response = await this.ApiServiceClient.post<IPostBoardRequestDTO, IApiResponse<IBoardResponseDTO>>(
        '/boards',
        data
      );
      const {
        data: { data: responseData },
      } = response;
      return responseData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async patchBoard(boardId: string, data: IPatchBoardRequestDTO): Promise<IBoard | undefined> {
    try {
      const response = await this.ApiServiceClient.patch<IPatchBoardRequestDTO, IApiResponse<IBoardResponseDTO>>(
        `boards/${boardId}`,
        data
      );
      const {
        data: { data: responseData },
      } = response;
      return responseData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async deleteBoard(boardId: string): Promise<number | boolean> {
    try {
      const response = await this.ApiServiceClient.delete(`boards/${boardId}`);
      const { status: statusCode } = response;
      return statusCode;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async postTask(boardId: string, columnId: string, data: IPostTaskRequestDTO): Promise<IBoard | undefined> {
    try {
      const response = await this.ApiServiceClient.post<IPostTaskRequestDTO, IApiResponse<IBoardResponseDTO>>(
        `boards/${boardId}/${columnId}`,
        data
      );
      const {
        data: { data: responseData },
      } = response;
      return responseData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async patchTask(
    boardId: string,
    columnId: string,
    taskId: string,
    data: IPatchTaskRequestDTO
  ): Promise<IBoard | undefined> {
    try {
      const response = await this.ApiServiceClient.patch<IPatchTaskRequestDTO, IApiResponse<IBoardResponseDTO>>(
        `boards/${boardId}/${columnId}/${taskId}`,
        data
      );
      const {
        data: { data: responseData },
      } = response;
      return responseData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async patchTaskColumn(
    boardId: string,
    columnId: string,
    data: IPatchTaskColumnRequestDTO
  ): Promise<IBoard | undefined> {
    try {
      const response = await this.ApiServiceClient.patch<IPatchTaskColumnRequestDTO, IApiResponse<IBoardResponseDTO>>(
        `boards/${boardId}/${columnId}
      `,
        data
      );
      const {
        data: { data: responseData },
      } = response;
      return responseData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async deleteTask(boardId: string, columnId: string, taskId: string): Promise<number | boolean> {
    try {
      const response = await this.ApiServiceClient.delete(`boards/${boardId}/${columnId}/${taskId}`);
      const { status: statusCode } = response;
      return statusCode;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
