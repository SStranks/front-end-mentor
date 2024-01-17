import { Optional } from '#Services/ApiRequestDto';
import { ISubTask } from '#Shared/types';

export const placeholderText = [
  'e.g. Make coffee',
  'e.g. Drink coffee and smile',
  'e.g. Think about coffee some more',
  'e.g. Go make another cup of coffee',
  'e.g. Schedule time to purchase more coffee',
  'e.g. Enjoy coffee and smile more',
];

export type TFormBoardValues = {
  name: string;
  columns: { name: string }[];
};

export type TFormTaskValues = {
  title: string;
  description: string;
  subTasks: Optional<ISubTask, '_id'>[];
  status: string;
};
