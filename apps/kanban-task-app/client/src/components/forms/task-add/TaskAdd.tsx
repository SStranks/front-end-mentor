import type { IBoard, IColumn } from '@Shared/types';
import type { TStatusArr } from '@Types/types';

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

import styles from './_TaskAdd.module.scss';

type TProps = {
  activeBoard: IBoard;
  taskStatus: { current: string; statusArr: TStatusArr[] };
};

function TaskAdd(props: TProps): JSX.Element {
  const { activeBoard, taskStatus } = props;
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
      status: taskStatus.current,
      subTasks: [{ title: '' }, { title: '' }],
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
        isCompleted: false,
        title: subtask.title,
      })),
      title: data.title,
    };
    const selectedColumn = activeBoard.columns.find((c) => c.name === data.status) as IColumn;
    const columnId = selectedColumn._id;

    // Send data to backend API
    setLoadingUpdate(true);
    try {
      const responseData = await ApiService.postTask(activeBoard._id, columnId, newTask);
      if (!responseData) throw new Error('Could not post task!');

      modalDispatch({ type: 'close-modal' });
      return appDispatch({
        payload: {
          id: { boardId: responseData._id },
          data: responseData,
        },
        type: 'add-task',
      });
    } catch (error) {
      console.error(error);
      return modalDispatch({
        modalProps: { title: activeBoard.name },
        modalType: 'error',
        type: 'open-modal',
      });
    } finally {
      setLoadingUpdate(false);
    }
  });

  const onSubmitBtnHandler = () => {
    void onSubmit();
  };

  return (
    <div className={styles['container']}>
      <form className={styles['form']} onSubmit={onSubmitBtnHandler}>
        <p className={styles['form__title']}>Add New Task</p>
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
              <Dropdown name="status" currentListItem={value} listItems={taskStatus.statusArr} updateRHF={onChange} />
            )}
          />
        </div>
        <button type="submit" className={styles['form__btnCreateTask']} disabled={isLoading}>
          Create Task
        </button>
      </form>
    </div>
  );
}

export default TaskAdd;
