import type { IBoard } from '@apps/kanban-task-app-shared';

import type { TAppStateContext } from '@Types/types';
import type { IOrderedTasks } from '@Utils/taskSorting';

import { useReducer } from 'react';

import { generateOrderedTasks, orderStateTasks } from '@Utils/taskSorting';

const setLocalStoragePending = (state: TAppStateContext, localStoragePending: boolean) => {
  return { ...state, localStoragePending };
};

const setLocalStorageData = (state: TAppStateContext) => {
  const newOrderedTasks: IOrderedTasks[] = generateOrderedTasks(state);
  const localStorageData = JSON.stringify(newOrderedTasks);
  return { ...state, localStorageData };
};

const setInitialState = (state: TAppStateContext, payload: TActionHelper<'set-initial'>) => {
  const { data } = payload;
  let newState = { ...state, boards: data };

  // Synchronise API data with localStorage ordering of tasks
  const localStorageTaskOrderJSON = globalThis.localStorage.getItem('boards-taskOrder');
  // eslint-disable-next-line unicorn/no-negated-condition
  if (localStorageTaskOrderJSON !== null) {
    newState = orderStateTasks(newState, localStorageTaskOrderJSON);
    if (newState.localStoragePending) newState = setLocalStorageData(newState);
  } else {
    newState = setLocalStoragePending(newState, true);
    newState = setLocalStorageData(newState);
  }
  return newState;
};

const addTask = (state: TAppStateContext, payload: TActionHelper<'add-task'>) => {
  let newState = { ...state };
  const newBoard = payload.data;
  const board = newState.boards.findIndex((b) => b._id === newBoard._id);
  newState.boards[board] = newBoard;
  newState = setLocalStoragePending(newState, true);
  newState = setLocalStorageData(newState);
  return newState;
};

const updateTask = (state: TAppStateContext, payload: TActionHelper<'update-task'>) => {
  console.log('UPDATETASK REDUCER');
  let newState = { ...state };
  const { boardId } = payload.id;
  const boardIdx = newState.boards.findIndex((b) => b._id === boardId);
  newState.boards[boardIdx] = payload.data;
  newState = setLocalStoragePending(newState, true);
  newState = setLocalStorageData(newState);
  return newState;
};

const deleteTask = (state: TAppStateContext, payload: TActionHelper<'delete-task'>) => {
  const { boardId, columnId, taskId } = payload.id;

  const newState = {
    ...state,
    boards: state.boards.map((board) =>
      board._id === boardId
        ? {
            ...board,
            columns: board.columns.map((column) =>
              column._id === columnId
                ? {
                    ...column,
                    tasks: column.tasks.filter((task) => task._id !== taskId),
                  }
                : column
            ),
          }
        : board
    ),
  };

  return setLocalStorageData(setLocalStoragePending(newState, true));
};

const addBoard = (state: TAppStateContext, payload: TActionHelper<'add-board'>) => {
  console.log('ADDBOARD REDUCER', state, payload);
  const newBoard = payload.data;
  let newState = { ...state, boards: [...state.boards, newBoard] };
  newState = setLocalStoragePending(newState, true);
  newState = setLocalStorageData(newState);
  return newState;
};

const editBoard = (state: TAppStateContext, payload: TActionHelper<'edit-board'>) => {
  console.log('EDITBOARD REDUCER', payload);
  let newState = { ...state };
  const boardIdx = newState.boards.findIndex((b) => b._id === payload.id.boardId);
  newState.boards[boardIdx] = payload.data;
  newState = setLocalStoragePending(newState, true);
  newState = setLocalStorageData(newState);
  return newState;
};

const deleteBoard = (state: TAppStateContext, payload: TActionHelper<'delete-board'>) => {
  const filterBoards = state.boards.filter((b) => b._id !== payload.id.boardId);
  let newState = { ...state, boards: filterBoards };
  newState = setLocalStoragePending(newState, true);
  newState = setLocalStorageData(newState);
  return newState;
};

export type TAction =
  | { payload: { id: { boardId: string }; data: IBoard }; type: 'add-task' }
  | { payload: { id: { boardId: string }; data: IBoard }; type: 'update-task' }
  | { payload: { id: { boardId: string; columnId: string; taskId: string } }; type: 'delete-task' }
  | { payload: { id: { boardId: string }; data: IBoard }; type: 'add-board' }
  | { payload: { id: { boardId: string }; data: IBoard }; type: 'edit-board' }
  | { payload: { id: { boardId: string } }; type: 'delete-board' }
  | { localStorage: { localStoragePending: boolean }; type: 'localStoragePending' }
  | { payload: { data: IBoard[] }; type: 'set-initial' };

type TActionPayloads = Exclude<TAction, { type: 'localStoragePending' }>;

type TActionHelper<T extends string> = Extract<TActionPayloads, { type: T }>['payload'];

const reducer = (state: TAppStateContext, action: TAction): TAppStateContext => {
  switch (action.type) {
    case 'localStoragePending': {
      return setLocalStoragePending(state, action.localStorage.localStoragePending);
    }
    case 'set-initial': {
      return setInitialState(state, action.payload);
    }
    case 'add-task': {
      return addTask(state, action.payload);
    }
    case 'update-task': {
      return updateTask(state, action.payload);
    }
    case 'delete-task': {
      return deleteTask(state, action.payload);
    }
    case 'add-board': {
      return addBoard(state, action.payload);
    }
    case 'edit-board': {
      return editBoard(state, action.payload);
    }
    case 'delete-board': {
      return deleteBoard(state, action.payload);
    }
    default: {
      return state;
    }
  }
};

function useAppReducer(initialState: TAppStateContext): [TAppStateContext, React.Dispatch<TAction>] {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}

export default useAppReducer;
