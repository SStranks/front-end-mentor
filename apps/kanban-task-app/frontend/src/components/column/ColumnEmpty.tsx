import type { IBoard } from '#Shared/types';
import { useRootModalContext } from '#Context/RootModalContext';
import styles from './_Column.module.scss';

type TProps = {
  activeBoard: IBoard;
};

function ColumnEmpty(props: TProps): JSX.Element {
  const { activeBoard } = props;
  const modalDispatch = useRootModalContext();

  const newColumnBtnClickHandler = () => {
    modalDispatch({
      type: 'open-modal',
      modalType: 'board-edit',
      modalProps: { activeBoard },
    });
  };

  return (
    <div className={styles.columnEmpty}>
      <button type="button" className={styles.columnEmpty__btn} onClick={newColumnBtnClickHandler}>
        <p>+ New Column</p>
      </button>
    </div>
  );
}

export default ColumnEmpty;
