import type { IBoard } from '@apps/kanban-task-app-shared';

import { useRootModalContext } from '@Context/RootModalContext';

import styles from './_Column.module.scss';

type TProps = {
  activeBoard: IBoard;
};

function ColumnEmpty(props: TProps): JSX.Element {
  const { activeBoard } = props;
  const modalDispatch = useRootModalContext();

  const newColumnBtnClickHandler = () => {
    modalDispatch({
      modalProps: { activeBoard },
      modalType: 'board-edit',
      type: 'open-modal',
    });
  };

  return (
    <div className={styles['columnEmpty']}>
      <button type="button" className={styles['columnEmpty__btn']} onClick={newColumnBtnClickHandler}>
        <p>+ New Column</p>
      </button>
    </div>
  );
}

export default ColumnEmpty;
