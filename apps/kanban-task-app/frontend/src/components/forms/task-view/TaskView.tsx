import type { TSelectTask } from '#Types/types';
import type { ISubTask } from '#Shared/types';
import { useEffect, useMemo, useRef } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import CheckBox from '#Components/custom/checkbox/CheckBox';
import Dropdown from '#Components/custom/dropdown/Dropdown';
import { useLoadingUpdate } from '#Context/LoadingContext';
import { useRootModalContext } from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import IconVerticalEllipsis from '#Svg/icon-vertical-ellipsis.svg';
import styles from './_TaskView.module.scss';
import { useAppDispatchContext, useAppStateContext } from '#Context/AppContext';

type TFormValues = {
  subtasks: ISubTask[];
  status: string;
};

type TProps = {
  selectedTask: TSelectTask;
};

function TaskView(props: TProps): JSX.Element {
  const { selectedTask } = props;
  const appState = useAppStateContext();
  const appDispatch = useAppDispatchContext();
  const modalDispatch = useRootModalContext();
  const setLoadingUpdate = useLoadingUpdate();
  const menuRef = useRef<HTMLDivElement>(null);
  const { task, statusArr } = useMemo(() => {
    const board = appState.boards.find((el) => el._id === selectedTask.boardId);
    const columnList = board?.columns.map((el) => ({ name: el.name, _id: el._id }));
    const column = board?.columns.find((el) => el._id === selectedTask.columnId);
    const task = column?.tasks.find((el) => el._id === selectedTask.taskId);
    if (!task || !columnList) throw new Error('Incongruence in data!');
    return { task, statusArr: columnList };
  }, [appState, selectedTask]);
  const {
    formState: { isDirty },
    handleSubmit,
    control,
    getValues,
  } = useForm<TFormValues>({
    defaultValues: {
      subtasks: task.subtasks.map((subtask) => ({
        _id: subtask._id,
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      })),
      status: task.status,
    },
  });
  const { fields } = useFieldArray({
    name: 'subtasks',
    control,
  });

  const isFormUpdating = useRef<boolean>(false);
  const onSubmit = handleSubmit(async (data) => {
    const { boardId, columnId, taskId } = selectedTask;
    const newTask = {
      title: task.title,
      description: task.description,
      status: data.status,
      subtasks: data.subtasks.map((subtask) => ({
        _id: subtask._id,
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      })),
    };

    const updateTask = async () => {
      setLoadingUpdate(true);
      try {
        const responseData = await ApiService.patchTask(boardId, columnId, taskId, newTask);
        if (!responseData) throw new Error('Could not patch task!');

        return appDispatch({
          type: 'update-task',
          payload: {
            id: { boardId },
            data: responseData,
          },
        });
      } catch (error) {
        console.error(error);
        return modalDispatch({
          type: 'open-modal',
          modalType: 'error',
          modalProps: { title: task.title },
        });
      } finally {
        setLoadingUpdate(false);
      }
    };

    const updateTaskColumn = async (newColumnId: string) => {
      setLoadingUpdate(true);
      try {
        const data = {
          taskId,
          newColumnId,
          newTask: { ...newTask, _id: taskId },
        };

        const responseData = await ApiService.patchTaskColumn(boardId, columnId, data);
        if (!responseData) throw new Error('Could not patch task column!');

        return appDispatch({
          type: 'update-task',
          payload: { id: { boardId }, data: responseData },
        });
      } catch (error) {
        console.error(error);
        return modalDispatch({
          type: 'open-modal',
          modalType: 'error',
          modalProps: { title: task.title },
        });
      } finally {
        setLoadingUpdate(false);
      }
    };

    const newColumnId = statusArr.find((c) => c.name === data.status)?._id as string;
    if (columnId === newColumnId) {
      updateTask();
    } else {
      updateTaskColumn(newColumnId);
    }
  });

  useEffect(() => {
    isFormUpdating.current = false;
    return () => {
      if (isDirty && !isFormUpdating.current) {
        console.log('SUBMITTING', isFormUpdating.current, onSubmit);
        onSubmit();
      }
    };
  });

  const menuBtnClickHandler = () => {
    menuRef.current?.classList.toggle('hidden');
  };

  const menuClickCaptureHandler = (e: React.MouseEvent) => {
    const element = e.target as Element;
    if (element.innerHTML === 'Edit Task') {
      menuRef.current?.classList.add('hidden');
      isFormUpdating.current = true;
      modalDispatch({
        type: 'open-modal',
        modalType: 'task-edit',
        modalProps: { task, selectedTask, statusArr },
      });
    }
    if (element.innerHTML === 'Delete Task') {
      menuRef.current?.classList.add('hidden');
      isFormUpdating.current = true;
      modalDispatch({
        type: 'open-modal',
        modalType: 'task-delete',
        modalProps: { id: selectedTask },
      });
    }
  };

  const tasksComplete = getValues().subtasks.filter((subtask) => subtask.isCompleted).length;

  return (
    <form className={styles.container} id="form-1">
      <div className={styles.taskView}>
        <div className={styles.taskView__header}>
          <p>{task.title}</p>
          <div className={styles.taskView__menu}>
            <button type="button" className={styles.taskView__menu__btn} onClick={menuBtnClickHandler}>
              <img src={IconVerticalEllipsis} alt="" />
            </button>
            <div
              className={`${styles.taskView__dropdown} hidden`}
              ref={menuRef}
              onClickCapture={menuClickCaptureHandler}>
              <p>Edit Task</p>
              <p>Delete Task</p>
            </div>
          </div>
        </div>
        <p className={styles.taskView__description}>{task.description}</p>
        <div>
          <p className={styles.taskView__subTasksTitle}>
            Subtasks ({tasksComplete} of {task.subtasks.length})
          </p>
          <div className={styles.taskView__subTasks}>
            {fields.map((item, i) => (
              <Controller
                key={item.id}
                control={control}
                name={`subtasks.${i}.isCompleted`}
                render={({ field: { onChange } }) => (
                  <CheckBox id={item._id} title={item.title} checked={item.isCompleted} updateRHF={onChange} />
                )}
              />
            ))}
          </div>
        </div>
        <div className={styles.taskView__status}>
          <p>Current Status</p>
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <Dropdown name="input-status" currentListItem={value} listItems={statusArr} updateRHF={onChange} />
            )}
          />
        </div>
      </div>
    </form>
  );
}

export default TaskView;
