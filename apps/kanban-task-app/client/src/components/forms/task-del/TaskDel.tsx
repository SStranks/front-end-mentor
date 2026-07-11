import { useAppDispatchContext } from '#Context/AppContext';
import { useLoading, useLoadingUpdate } from '#Context/LoadingContext';
import { useRootModalContext } from '#Context/RootModalContext';
import ApiService from '#Services/Services';

import styles from './_TaskDel.module.scss';

type TProps = {
  id: { boardId: string; columnId: string; taskId: string };
};

function TaskDelete(props: TProps): JSX.Element {
  const { id } = props;
  const appDispatch = useAppDispatchContext();
  const modalDispatch = useRootModalContext();
  const setLoadingUpdate = useLoadingUpdate();
  const isLoading = useLoading();

  const deleteTask = async () => {
    const { boardId, columnId, taskId } = id;

    setLoadingUpdate(true);
    try {
      const responseData = await ApiService.deleteTask(boardId, columnId, taskId);
      if (!responseData) throw new Error('Could not delete task!');

      modalDispatch({ modalType: undefined, type: 'close-all' });
      return appDispatch({
        payload: { id },
        type: 'delete-task',
      });
    } catch (error) {
      console.error(error);
      return modalDispatch({
        modalProps: { title: 'task deletion' },
        modalType: 'error',
        type: 'open-modal',
      });
    } finally {
      setLoadingUpdate(false);
    }
  };

  const deleteBtnClickHandler = () => {
    void deleteTask();
  };

  const cancelBtnClickHandler = () => {
    modalDispatch({ type: 'close-modal' });
  };

  return (
    <div className={styles['container']}>
      <form className={styles['form']}>
        <p className={styles['form__title']}>Delete this task?</p>
        <p className={styles['form__description']}>
          Are you sure you want to delete the &apos;Build settings UI&apos; task and its subtasks? This action cannot be
          reversed.
        </p>
        <div className={styles['form__btnGroup']}>
          <button
            type="button"
            className={styles['form__btnDelete']}
            onClick={deleteBtnClickHandler}
            disabled={isLoading}>
            Delete
          </button>
          <button type="button" className={styles['form__btnCancel']} onClick={cancelBtnClickHandler}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default TaskDelete;
