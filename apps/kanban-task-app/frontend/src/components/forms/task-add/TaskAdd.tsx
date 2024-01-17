import type { IBoard, IColumn } from '#Shared/types';
import { useContext } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import DropdownNew from '#Components/custom/dropdown/DropdownNew';
import { AppDispatchContext } from '#Context/AppContext';
import RootModalDispatchContext from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import { placeholderText, TFormTaskValues } from '../shared';
import IconCross from '#Svg/icon-cross.svg';
import styles from './_TaskAdd.module.scss';

type TProps = {
  activeBoard: IBoard;
  taskStatus: { current: string; statusArr: string[] };
};

function TaskAdd(props: TProps): JSX.Element {
  const { activeBoard, taskStatus } = props;
  const appDispatch = useContext(AppDispatchContext);
  const modalDispatch = useContext(RootModalDispatchContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormTaskValues>({
    defaultValues: {
      subTasks: [{ title: '' }, { title: '' }],
      status: taskStatus.current,
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
        title: subtask.title,
        isCompleted: false,
      })),
    };
    const selectedColumn = activeBoard.columns.find((c) => c.name === data.status) as IColumn;
    const columnId = selectedColumn._id;

    // Send data to backend API
    try {
      const responseData = await ApiService.postTask(activeBoard._id, columnId, newTask);
      if (!responseData) throw new Error('Could not post task!');

      modalDispatch({ type: 'close-modal' });
      return appDispatch({
        type: 'add-task',
        payload: {
          id: { boardId: responseData._id },
          data: responseData,
        },
      });
    } catch (error) {
      console.error(error);
      return modalDispatch({
        type: 'open-modal',
        modalType: 'error',
        modalProps: { title: activeBoard.name },
      });
    }
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className={styles.form__title}>Add New Task</p>
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
                listItems={taskStatus.statusArr.map((status) => ({ item: status }))}
                updateRHF={onChange}
              />
            )}
          />
        </div>
        <button type="submit" className={styles.form__btnCreateTask}>
          Create Task
        </button>
      </form>
    </div>
  );
}

export default TaskAdd;
