import type { IBoard } from '#Shared/types';

import ColumnGrid from '#Components/column-grid/ColumnGrid';
import { useRootModalContext } from '#Context/RootModalContext';

import styles from './_Main.module.scss';

type TProps = {
  activeBoard: IBoard | undefined;
};

function Main(props: TProps): JSX.Element {
  const { activeBoard } = props;
  const modalDispatch = useRootModalContext();
  const isBoardEmpty = activeBoard?.columns.length === 0;

  const addNewBtnClickHandler = () => {
    modalDispatch({
      modalProps: { activeBoard },
      modalType: 'board-edit',
      type: 'open-modal',
    });
  };

  const emptyBoard = (
    <div className={styles['main__empty']}>
      <p>This board is empty. Create a new column to get started</p>
      <button type="button" onClick={addNewBtnClickHandler}>
        {' '}
        + Add New Column
      </button>
    </div>
  );

  return <main className={styles['main']}>{isBoardEmpty ? emptyBoard : <ColumnGrid activeBoard={activeBoard} />}</main>;
}

export default Main;
