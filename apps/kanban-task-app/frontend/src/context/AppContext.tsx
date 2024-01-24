import type { IBoard, IColumn, ITask } from '#Shared/types';
import type { TAppStateContext } from '#Types/types';
import React, { PropsWithChildren, useContext } from 'react';
import useAppReducer, { TAction } from '#Hooks/useAppReducer';

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
    localStoragePending: false,
    localStorageData: undefined,
  });

  return (
    <AppStateContext.Provider value={appState}>
      <AppDispatchContext.Provider value={appDispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
