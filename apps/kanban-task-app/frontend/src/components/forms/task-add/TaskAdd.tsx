import type { IBoard, IColumn } from '#Shared/types';
import { useContext } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import DropdownNew from '#Components/custom/dropdown/DropdownNew';
import { AppDispatchContext } from '#Context/AppContext';
import RootModalDispatchContext from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import { TFormTaskValues, placeholderText } from '../shared';
import IconCross from '#Svg/icon-cross.svg';
import styles from './_TaskAdd.module.scss';
import InputText from '#Components/custom/input-text/InputText';
import InputTextArea from '#Components/custom/input-textarea/InputTextArea';

type TProps = {
  activeBoard: IBoard;
  taskStatus: { current: string; statusArr: string[] };
};

function TaskAdd(props: TProps): JSX.Element {
  const { activeBoard, taskStatus } = props;
  const appDispatch = useContext(AppDispatchContext);
  const modalDispatch = useContext(RootModalDispatchContext);
  const {
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
