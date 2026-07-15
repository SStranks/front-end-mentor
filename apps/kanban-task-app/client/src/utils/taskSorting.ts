import type { ITask } from '@apps/kanban-task-app-shared';

import type { TAppStateContext } from '@Types/types';

export interface IOrderedTasks {
  _id: string;
  columns: { _id: string; tasks: string[] }[];
}

export const generateOrderedTasks = (state: TAppStateContext): IOrderedTasks[] => {
  return state.boards.map((board) => {
    const columns = board.columns.map((column) => {
      const tasks = column.tasks.map((task) => task._id);
      return { _id: column._id, tasks };
    });
    return { _id: board._id, columns };
  });
};

export const orderStateTasks = (state: TAppStateContext, localStorageJSON: string): TAppStateContext => {
  const newState = { ...state };
  const parsedLocalStorage: unknown = JSON.parse(localStorageJSON);
  const orderedTasks = parsedLocalStorage as IOrderedTasks[];
  let isDataSynchronized: boolean = true;

  const sortedBoards = newState.boards.map((stateBoard) => {
    const localBoard = orderedTasks.find((board) => board._id === stateBoard._id);

    if (!localBoard) {
      isDataSynchronized = false;
      return stateBoard;
    }

    const sortedColumns = stateBoard.columns.map((stateColumn) => {
      const localColumn = localBoard.columns.find((column) => column._id === stateColumn._id);

      if (!localColumn) {
        isDataSynchronized = false;
        return stateColumn;
      }

      const sortedTasks: ITask[] = [];
      const sortedTaskIds = new Set();

      // NOTE:  Could optimize this portion by converting state tasks into hashmap first;
      // deleting sorted tasks from it, then merging the remainder at the end.
      localColumn.tasks.forEach((localStorageTaskId) => {
        const localTask = stateColumn.tasks.find((stateTask) => stateTask._id === localStorageTaskId);
        if (localTask) {
          sortedTasks.push(localTask);
          sortedTaskIds.add(localTask._id);
        } else {
          isDataSynchronized = false;
        }
      });

      const missingTasks = stateColumn.tasks.filter((stateTask) => !sortedTaskIds.has(stateTask._id));
      if (missingTasks.length > 0) isDataSynchronized = false;

      return { ...stateColumn, tasks: [...sortedTasks, ...missingTasks] };
    });
    return { ...stateBoard, columns: sortedColumns };
  });

  // If boards or tasks are not synchronised, recreate localStorage
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!isDataSynchronized) newState.localStoragePending = true;

  return { ...newState, boards: sortedBoards };
};

// create: export saveToLocalStorage;
