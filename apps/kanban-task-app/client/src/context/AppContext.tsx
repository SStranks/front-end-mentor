import type { PropsWithChildren } from 'react';

import type { TAction } from '#Hooks/useAppReducer';
import type { IBoard, IColumn, ITask } from '#Shared/types';
import type { TAppStateContext } from '#Types/types';

import React, { useContext } from 'react';

import useAppReducer from '#Hooks/useAppReducer';

export interface IAppContextPayload {
  id: { boardId: string; columnId?: string; taskId?: string };
  data: IBoard | IColumn | ITask | null;
}

export interface IAppContextLocalStorage {
  localStorageData?: string; // JSON
  localStoragePending?: boolean;
}

export type TAppContextAction = {
  type: string;
  localStorage?: IAppContextLocalStorage;
  payload?: IAppContextPayload;
};

type TAppDispatchContext = React.Dispatch<TAction>;

const AppStateContext = React.createContext<TAppStateContext | undefined>({} as TAppStateContext);
const AppDispatchContext = React.createContext<TAppDispatchContext | undefined>({} as TAppDispatchContext);

export function useAppStateContext() {
  const context = useContext(AppStateContext);
  if (context === undefined) throw new Error('AppStateContext outside of scope!');
  return context;
}

export function useAppDispatchContext() {
  const context = useContext(AppDispatchContext);
  if (context === undefined) throw new Error('AppStateContext outside of scope!');
  return context;
}

export function AppProvider({ children }: PropsWithChildren) {
  const [appState, appDispatch] = useAppReducer({
    boards: [],
    localStorageData: undefined,
    localStoragePending: false,
  });

  return (
    <AppStateContext.Provider value={appState}>
      <AppDispatchContext.Provider value={appDispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
