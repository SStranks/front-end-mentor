import type { ITask } from '#Shared/types';
import type { TSelectTask } from '#Types/types';
import { useContext } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import DropdownNew from '#Components/custom/dropdown/DropdownNew';
import { AppDispatchContext } from '#Context/AppContext';
import RootModalDispatchContext from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import { placeholderText, TFormTaskValues } from '../shared';
import IconCross from '#Svg/icon-cross.svg';
import styles from './_TaskEdit.module.scss';

type TProps = {
  task: ITask;
  selectTask: TSelectTask;
  statusArr: { name: string; id: string }[];
};

function TaskEdit(props: TProps): JSX.Element {
  const { task, selectTask, statusArr } = props;
  const appDispatch = useContext(AppDispatchContext);
  const modalDispatch = useContext(RootModalDispatchContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormTaskValues>({
    defaultValues: {
      subTasks: task.subtasks.map((subtask) => ({
        _id: subtask._id,
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      })),
      status: task.status,
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'subTasks',
    control,
    rules: { required: 'Input required' },
  });

  const onSubmit = handleSubmit(async (data) => {
    // Format data according to schema
    const newTask = {
      title: data.title,
      description: data.description,
      status: data.status,
      subtasks: data.subTasks.map((subtask) => ({
        _id: subtask._id,
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      })),
    };

    const { boardId, columnId, taskId } = selectTask;
    const newColumnId = statusArr.find((status) => status.name === data.status)?.id as string;

    // Send data to backend API
    try {
      let responseData;
      if (columnId === newColumnId) {
        responseData = await ApiService.patchTask(boardId, columnId, taskId, newTask);
      } else {
        const data = {
          taskId,
          newColumnId,
          newTask,
        };
        responseData = await ApiService.patchTaskColumn(boardId, columnId, data);
      }

      if (!responseData) throw new Error('Could not patch task!');

      appDispatch({
        type: 'update-task',
        payload: { id: { boardId }, data: responseData },
      });
      return modalDispatch({ type: 'close-all', modalType: undefined });
    } catch (error) {
      console.error(error);
      return modalDispatch({
        type: 'open-modal',
        modalType: 'error',
        modalProps: { title: task.title },
      });
    }
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className={styles.form__title}>Edit Task</p>
        <div className={styles.form__group}>
          <p>Title</p>
          <div className={`${styles.form__titleInput} ${errors.title ? styles['form__titleInput--error'] : ''}`}>
            <input {...register('title', { required: 'Input required' })} type="text" placeholder="e.g. Web Design" />
          </div>
        </div>
        <div className={styles.form__group}>
          <p>Description</p>
          <div
            className={`${styles.form__descriptionInput} ${
              errors.description ? styles['form__descriptionInput--error'] : ''
            }`}>
            <textarea
              {...register('description', { required: 'Input required' })}
              className={styles.descriptionInput__input}
              placeholder="It's always good to take a break. This 15 minute break will recharge the batteries a little"
            />
          </div>
        </div>
        <div className={styles.form__group}>
          <p>Sub-Tasks</p>
          <div className={styles.form__listItems}>
            {fields.map((field, index) => (
              <div className={styles.form__subTask} key={field.id}>
                <div
                  className={`${styles.form__subTask__container} ${
                    errors?.subTasks?.[index]?.title ? styles['form__subTask__container--error'] : ''
                  }`}>
                  <input
                    {...register(`subTasks.${index}.title` as const, { required: true })}
                    type="text"
                    placeholder={placeholderText[index % placeholderText.length]}
                  />
                </div>
                <button type="button" onClick={() => remove(index)}>
                  <img src={IconCross} alt="" className={styles.icon} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={styles.form__btnNewSubTask}
            onClick={() => append({ title: '', isCompleted: false })}>
            + Add New Sub-Task
          </button>
        </div>
        <div className={styles.form__group}>
          <p>Status</p>
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <DropdownNew
                name="status"
                currentListItem={value}
                listItems={statusArr.map(({ name }) => ({ item: name }))}
                updateRHF={onChange}
              />
            )}
          />
        </div>
        <button type="submit" className={styles.form__btnSaveForm}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default TaskEdit;
