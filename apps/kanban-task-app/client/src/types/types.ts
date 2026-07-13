import type { IBoard, IColumn } from '@Shared/types';

export type TBoardInfo = { id: string; name: string }[];

export type TAppStateContext = {
  boards: IBoard[];
  localStorageData: string | undefined;
  localStoragePending: boolean;
};

export type TStatusArr = Omit<IColumn, 'tasks'>;

export type TSelectTask = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export type TReturnData = {
  inputName: string;
  columnId?: string;
  groupId?: string;
  isCompleted?: boolean;
  value?: string | boolean;
};

export type TInputProp = {
  error: boolean;
  inputName: string;
  value: string;
  isCompleted?: boolean;
  key?: string;
  statusArr?: string[][];
  title?: string;
};

export type TNestedInputProp = {
  [key: string]: TInputProp;
};

export type TNewFormData = {
  [key: string]: TInputProp | TNestedInputProp;
};

// Root Modal
export type TRootModalState = {
  modalProps: Record<string, unknown>[];
  modalType: string[];
};
