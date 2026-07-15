import type { IBoard } from '@apps/kanban-task-app-shared';

import type { TBoardInfo } from '@Types/types';

import Aside from '@Components/aside/Aside';
import Main from '@Components/main/Main';
import Nav from '@Components/nav/Nav';

import styles from './_DefaultLayout.module.scss';

type TProps = {
  activeBoardId: string;
  boardData: { activeBoard: IBoard | undefined; boardsList: TBoardInfo };
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

function DefaultLayout(props: TProps): JSX.Element {
  const { boardData, activeBoardId, setActiveBoardId } = props;
  return (
    <div className={styles['container']}>
      <Nav
        activeBoardId={activeBoardId}
        boardsList={boardData.boardsList}
        activeBoard={boardData.activeBoard}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={styles['container__subcontainer']}>
        <div className={styles['container__subcontainer__aside']}>
          <Aside boardsList={boardData.boardsList} activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />
        </div>
        <Main activeBoard={boardData.activeBoard} />
      </div>
    </div>
  );
}

export default DefaultLayout;
