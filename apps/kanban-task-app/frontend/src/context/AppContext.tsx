import type { IBoard, IColumn, ITask } from '#Shared/types';
import type { TAppStateContext } from '#Types/types';
import React from 'react';
import { TAction } from '#Hooks/useAppReducer';

export interface IAppContextPayload {
  id: { boardId: string; columnId?: string; taskId?: string };
  data: IBoard | IColumn | ITask | null;
}

export interface IAppContextLocalStorage {
  localStoragePending?: boolean;
  localStorageData?: string; // JSON
}

export type TAppContextAction = {
  type: string;
  payload?: IAppContextPayload;
  localStorage?: IAppContextLocalStorage;
};

type TAppDispatchContext = React.Dispatch<TAction>;

export const AppDispatchContext = React.createContext<TAppDispatchContext>({} as TAppDispatchContext);

export const AppStateContext = React.createContext<TAppStateContext>({} as TAppStateContext);
