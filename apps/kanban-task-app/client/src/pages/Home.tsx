/* eslint-disable perfectionist/sort-object-types */
import type { IBoard } from '@apps/kanban-task-app-shared';

import type { TBoardInfo } from '@Types/types';

import DefaultLayout from '@Layouts/DefaultLayout';

type TProps = {
  boardData: { boardsList: TBoardInfo; activeBoard: IBoard | undefined };
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

function Home(props: TProps): JSX.Element {
  const { boardData, activeBoardId, setActiveBoardId } = props;
  return <DefaultLayout boardData={boardData} activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />;
}

export default Home;
