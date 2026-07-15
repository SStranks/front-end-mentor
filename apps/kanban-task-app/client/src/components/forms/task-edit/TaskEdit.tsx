import type { ITask } from '@apps/kanban-task-app-shared';

import type { TSelectTask, TStatusArr } from '@Types/types';

import type { TFormTaskValues } from '../shared';

import { Controller, useFieldArray, useForm } from 'react-hook-form';

import Dropdown from '@Components/custom/dropdown/Dropdown';
import InputText from '@Components/custom/input-text/InputText';
import InputTextArea from '@Components/custom/input-textarea/InputTextArea';
import { useAppDispatchContext } from '@Context/AppContext';
import { useLoading, useLoadingUpdate } from '@Context/LoadingContext';
import { useRootModalContext } from '@Context/RootModalContext';
import ApiService from '@Services/Services';
import IconCross from '@Svg/icon-cross.svg';

import { placeholderText } from '../shared';

import styles from './_TaskEdit.module.scss';

type TProps = {
  selectedTask: TSelectTask;
  statusArr: TStatusArr[];
  task: ITask;
};

function TaskEdit(props: TProps): JSX.Element {
  const { task, selectedTask, statusArr } = props;
  const appDispatch = useAppDispatchContext();
  const modalDispatch = useRootModalContext();
  const isLoading = useLoading();
  const setLoadingUpdate = useLoadingUpdate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormTaskValues>({
    defaultValues: {
      description: task.description,
      status: task.status,
      subTasks: task.subtasks.map((subtask) => ({
        _id: subtask._id,
        isCompleted: subtask.isCompleted,
        title: subtask.title,
      })),
      title: task.title,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subTasks',
    rules: { required: 'Input required' },
  });

  const onSubmit = handleSubmit(async (data) => {
    // Format data according to schema
    const newTask = {
      description: data.description,
      status: data.status,
      subtasks: data.subTasks.map((subtask) => ({
        _id: subtask._id,
        isCompleted: subtask.isCompleted,
        title: subtask.title,
      })),
      title: data.title,
    };

    const { boardId, columnId, taskId } = selectedTask;
    const newColumnId = statusArr.find((status) => status.name === data.status)?._id as string;

    // Send data to backend API
    setLoadingUpdate(true);
    try {
      let responseData;
      if (columnId === newColumnId) {
        responseData = await ApiService.patchTask(boardId, columnId, taskId, newTask);
      } else {
        const data = {
          newColumnId,
          newTask,
          taskId,
        };
        responseData = await ApiService.patchTaskColumn(boardId, columnId, data);
      }

      if (!responseData) throw new Error('Could not patch task!');

      appDispatch({
        payload: { id: { boardId }, data: responseData },
        type: 'update-task',
      });
      return modalDispatch({ modalType: undefined, type: 'close-all' });
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
  });

  const onSubmitClickHandler = () => {
    void onSubmit();
  };

  return (
    <div className={styles['container']}>
      <form className={styles['form']} onSubmit={onSubmitClickHandler}>
        <p className={styles['form__title']}>Edit Task</p>
        <div className={styles['form__group']}>
          <p>Title</p>
          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <InputText
                placeholder="e.g Web Design"
                inputName="name"
                value={value}
                error={!!errors.title}
                updateRHF={onChange}
              />
            )}
          />
        </div>
        <div className={styles['form__group']}>
          <p>Description</p>
          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <InputTextArea
                placeholder="It's always good to take a break. This 15 minute break will recharge the batteries a little"
                inputName="description"
                value={value}
                error={!!errors.title}
                updateRHF={onChange}
              />
            )}
          />
        </div>
        <div className={styles['form__group']}>
          <p>Sub-Tasks</p>
          <div className={styles['form__listItems']}>
            {fields.map((field, index) => (
              <div className={styles['form__subTask']} key={field.id}>
                <Controller
                  control={control}
                  name={`subTasks.${index}.title` as const}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <InputText
                      placeholder={placeholderText[index] ?? placeholderText[0]}
                      inputName={`columns.${index}.name`}
                      value={value}
                      error={!!errors.subTasks?.[index]?.title}
                      updateRHF={onChange}
                    />
                  )}
                />
                <button type="button" onClick={() => remove(index)}>
                  <img src={IconCross} alt="" className={styles['icon']} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles['form__btnNewSubTask']}
            onClick={() => append({ isCompleted: false, title: '' })}>
            + Add New Sub-Task
          </button>
        </div>
        <div className={styles['form__group']}>
          <p>Status</p>
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <Dropdown name="status" currentListItem={value} listItems={statusArr} updateRHF={onChange} />
            )}
          />
        </div>
        <button type="submit" className={styles['form__btnSaveForm']} disabled={isLoading}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default TaskEdit;
