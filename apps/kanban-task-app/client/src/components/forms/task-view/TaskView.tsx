import type { ISubTask } from '#Shared/types';
import type { TSelectTask } from '#Types/types';

import { useEffect, useMemo, useRef } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import CheckBox from '#Components/custom/checkbox/CheckBox';
import Dropdown from '#Components/custom/dropdown/Dropdown';
import { useAppDispatchContext, useAppStateContext } from '#Context/AppContext';
import { useLoadingUpdate } from '#Context/LoadingContext';
import { useRootModalContext } from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import IconVerticalEllipsis from '#Svg/icon-vertical-ellipsis.svg';

import styles from './_TaskView.module.scss';

type TFormValues = {
  status: string;
  subtasks: ISubTask[];
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
    const columnList = board?.columns.map((el) => ({ _id: el._id, name: el.name }));
    const column = board?.columns.find((el) => el._id === selectedTask.columnId);
    const task = column?.tasks.find((el) => el._id === selectedTask.taskId);
    if (!task || !columnList) throw new Error('Incongruence in data!');
    return { statusArr: columnList, task };
  }, [appState, selectedTask]);
  const {
    formState: { isDirty },
    handleSubmit,
    control,
    getValues,
  } = useForm<TFormValues>({
    defaultValues: {
      status: task.status,
      subtasks: task.subtasks.map((subtask) => ({
        _id: subtask._id,
        isCompleted: subtask.isCompleted,
        title: subtask.title,
      })),
    },
  });
  const { fields } = useFieldArray({
    control,
    name: 'subtasks',
  });

  const isFormUpdating = useRef<boolean>(false);
  const onSubmit = handleSubmit(async (data) => {
    const { boardId, columnId, taskId } = selectedTask;
    const newTask = {
      description: task.description,
      status: data.status,
      subtasks: data.subtasks.map((subtask) => ({
        _id: subtask._id,
        isCompleted: subtask.isCompleted,
        title: subtask.title,
      })),
      title: task.title,
    };

    const updateTask = async () => {
      setLoadingUpdate(true);
      try {
        const responseData = await ApiService.patchTask(boardId, columnId, taskId, newTask);
        if (!responseData) throw new Error('Could not patch task!');

        return appDispatch({
          payload: {
            id: { boardId },
            data: responseData,
          },
          type: 'update-task',
        });
      } catch (error) {
        console.error(error);
        return modalDispatch({
          modalProps: { title: task.title },
          modalType: 'error',
          type: 'open-modal',
        });
      } finally {
        setLoadingUpdate(false);
      }
    };

    const updateTaskColumn = async (newColumnId: string) => {
      setLoadingUpdate(true);
      try {
        const data = {
          newColumnId,
          newTask: { ...newTask, _id: taskId },
          taskId,
        };

        const responseData = await ApiService.patchTaskColumn(boardId, columnId, data);
        if (!responseData) throw new Error('Could not patch task column!');

        return appDispatch({
          payload: { id: { boardId }, data: responseData },
          type: 'update-task',
        });
      } catch (error) {
        console.error(error);
        return modalDispatch({
          modalProps: { title: task.title },
          modalType: 'error',
          type: 'open-modal',
        });
      } finally {
        setLoadingUpdate(false);
      }
    };

    const newColumnId = statusArr.find((c) => c.name === data.status)?._id as string;
    await (columnId === newColumnId ? updateTask() : updateTaskColumn(newColumnId));
  });

  useEffect(() => {
    isFormUpdating.current = false;
    return () => {
      if (isDirty && !isFormUpdating.current) {
        void onSubmit();
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
        modalProps: { selectedTask, statusArr, task },
        modalType: 'task-edit',
        type: 'open-modal',
      });
    }
    if (element.innerHTML === 'Delete Task') {
      menuRef.current?.classList.add('hidden');
      isFormUpdating.current = true;
      modalDispatch({
        modalProps: { id: selectedTask },
        modalType: 'task-delete',
        type: 'open-modal',
      });
    }
  };

  const tasksComplete = getValues().subtasks.filter((subtask) => subtask.isCompleted).length;

  return (
    <form className={styles['container']} id="form-1">
      <div className={styles['taskView']}>
        <div className={styles['taskView__header']}>
          <p>{task.title}</p>
          <div className={styles['taskView__menu']}>
            <button type="button" className={styles['taskView__menu__btn']} onClick={menuBtnClickHandler}>
              <img src={IconVerticalEllipsis} alt="" />
            </button>
            <div
              className={`${styles['taskView__dropdown']} hidden`}
              ref={menuRef}
              onClickCapture={menuClickCaptureHandler}>
              <p>Edit Task</p>
              <p>Delete Task</p>
            </div>
          </div>
        </div>
        <p className={styles['taskView__description']}>{task.description}</p>
        <div>
          <p className={styles['taskView__subTasksTitle']}>
            Subtasks ({tasksComplete} of {task.subtasks.length})
          </p>
          <div className={styles['taskView__subTasks']}>
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
        <div className={styles['taskView__status']}>
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
