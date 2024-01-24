import { useContext } from 'react';
import { AppDispatchContext } from '#Context/AppContext';
import { useLoading, useLoadingUpdate } from '#Context/LoadingContext';
import { useRootModalContext } from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import styles from './_TaskDel.module.scss';

type TProps = {
  id: { boardId: string; columnId: string; taskId: string };
};

function TaskDelete(props: TProps): JSX.Element {
  const { id } = props;
  const appDispatch = useContext(AppDispatchContext);
  const modalDispatch = useRootModalContext();
  const setLoadingUpdate = useLoadingUpdate();
  const isLoading = useLoading();

  const deleteBtnClickHandler = () => {
    const { boardId, columnId, taskId } = id;
    (async () => {
      setLoadingUpdate(true);
      try {
        const responseData = await ApiService.deleteTask(boardId, columnId, taskId);
        if (!responseData) throw new Error('Could not delete task!');

        modalDispatch({ type: 'close-all', modalType: undefined });
        return appDispatch({
          type: 'delete-task',
          payload: { id },
        });
      } catch (error) {
        console.error(error);
        return modalDispatch({
          type: 'open-modal',
          modalType: 'error',
          modalProps: { title: 'task deletion' },
        });
      } finally {
        setLoadingUpdate(false);
      }
    })();
  };

  const cancelBtnClickHandler = () => {
    modalDispatch({ type: 'close-modal' });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <p className={styles.form__title}>Delete this task?</p>
        <p className={styles.form__description}>
          Are you sure you want to delete the &apos;Build settings UI&apos; task and its subtasks? This action cannot be
          reversed.
        </p>
        <div className={styles.form__btnGroup}>
          <button type="button" className={styles.form__btnDelete} onClick={deleteBtnClickHandler} disabled={isLoading}>
            Delete
          </button>
          <button type="button" className={styles.form__btnCancel} onClick={cancelBtnClickHandler}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default TaskDelete;
