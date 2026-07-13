import type { Optional } from '@Services/ApiRequestDto';
import type { ISubTask } from '@Shared/types';

export const placeholderText = [
  'e.g. Make coffee',
  'e.g. Drink coffee and smile',
  'e.g. Think about coffee some more',
  'e.g. Go make another cup of coffee',
  'e.g. Schedule time to purchase more coffee',
  'e.g. Enjoy coffee and smile more',
] as const;

export type TFormBoardValues = {
  columns: { name: string }[];
  name: string;
};

export type TFormTaskValues = {
  description: string;
  status: string;
  subTasks: Optional<ISubTask, '_id'>[];
  title: string;
};
