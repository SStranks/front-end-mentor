import type { ITask } from '#Shared/types';
import type { TSelectTask, TStatusArr } from '#Types/types';
import { useContext } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Dropdown from '#Components/custom/dropdown/Dropdown';
import { AppDispatchContext } from '#Context/AppContext';
import RootModalDispatchContext from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import { placeholderText, TFormTaskValues } from '../shared';
import IconCross from '#Svg/icon-cross.svg';
import styles from './_TaskEdit.module.scss';
import InputText from '#Components/custom/input-text/InputText';
import InputTextArea from '#Components/custom/input-textarea/InputTextArea';

type TProps = {
  task: ITask;
  selectedTask: TSelectTask;
  statusArr: TStatusArr[];
};

function TaskEdit(props: TProps): JSX.Element {
  const { task, selectedTask, statusArr } = props;
  const appDispatch = useContext(AppDispatchContext);
  const modalDispatch = useContext(RootModalDispatchContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormTaskValues>({
    defaultValues: {
      title: task.title,
      description: task.description,
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

    const { boardId, columnId, taskId } = selectedTask;
    const newColumnId = statusArr.find((status) => status.name === data.status)?._id as string;

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
        <div className={styles.form__group}>
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
        <div className={styles.form__group}>
          <p>Sub-Tasks</p>
          <div className={styles.form__listItems}>
            {fields.map((field, index) => (
              <div className={styles.form__subTask} key={field.id}>
                <Controller
                  control={control}
                  name={`subTasks.${index}.title` as const}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <InputText
                      placeholder={placeholderText[index]}
                      inputName={`columns.${index}.name`}
                      value={value}
                      error={!!errors?.subTasks?.[index]?.title}
                      updateRHF={onChange}
                    />
                  )}
                />
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
              <Dropdown name="status" currentListItem={value} listItems={statusArr} updateRHF={onChange} />
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
