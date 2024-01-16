import type { ISubTask, ITask } from '#Shared/types';
import { AppDispatchContext } from '#Context/AppContext';
import RootModalDispatchContext from '#Context/RootModalContext';
import { TSelectTask } from '#Types/types';
import { useContext } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import DropdownNew from '#Components/custom/dropdown/DropdownNew';
import IconCross from '#Svg/icon-cross.svg';
import styles from './_TaskEdit.module.scss';
import ApiService from '#Services/Services';
import { IPatchTaskColumnRequestDTO, Optional } from '#Services/ApiRequestDto';

// TODO:  In EditTask too - extract somewhere else.
const placeholderText = [
  'e.g. Make coffee',
  'e.g. Drink coffee and smile',
  'e.g. Think about coffee some more',
  'e.g. Go make another cup of coffee',
  'e.g. Schedule time to purchase more coffee',
  'e.g. Enjoy coffee and smile more',
];

// TODO:  In EditTask too - extract somewhere else.
type TFormValues = {
  title: string;
  description: string;
  subTasks: Optional<ISubTask, '_id'>[];
  status: string;
};

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
  } = useForm<TFormValues>({
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
    // const newColumnId = formData['input-status'].columnId;
    const newColumnId = statusArr.find((status) => status.name === data.status)?.id;

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
        } as IPatchTaskColumnRequestDTO;
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

  // const submitHandler = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Check if each formData input is empty. If true, add a new object to newFormData.
  //   const newFormData = validateInputs(formData);
  //   // If there are any empty inputs/objs in newFormData, abort form submission and merge the form state with the newFormData objs.
  //   if (Object.keys(newFormData).length > 0) {
  //     return setFormData((prev) => ({ ...prev, ...newFormData }) as typeof prev);
  //   }
  //   // All form inputs have been validated. Submit form data.
  //   const formInputData = new FormData(e.target as HTMLFormElement);
  //   // const title = formInputData.get('input-title') as string;
  //   // const description = formInputData.get('input-description') as string;
  //   // const status = formInputData.get('input-status') as string;
  //   // const rest = formInputData.get('input-group-1');

  //   const {
  //     'input-title': title,
  //     'input-description': description,
  //     'input-status': status,
  //     ...rest
  //   } = Object.fromEntries(formInputData.entries());

  //   // Copy in old column data if applicable
  //   const newSubtasks = Object.entries(rest).map(([key, value]) => {
  //     const subtaskId = key.split('-')[2];
  //     const subtaskIdx = task.subtasks.findIndex((st) => st._id === subtaskId);

  //     // eslint-disable-next-line unicorn/no-negated-condition
  //     return subtaskIdx !== -1 ? { ...task.subtasks[subtaskIdx], title: value } : { title: value };
  //   });

  //   const newTask = {
  //     title,
  //     description,
  //     status,
  //     subtasks: newSubtasks,
  //   } as IPatchTaskRequestDTO;

  //   const { boardId, columnId, taskId } = selectTask;
  //   const newColumnId = formData['input-status'].columnId;

  //   try {
  //     let responseData;
  //     if (columnId === newColumnId) {
  //       responseData = await ApiService.patchTask(boardId, columnId, taskId, newTask);
  //     } else {
  //       const data = {
  //         taskId,
  //         newColumnId,
  //         newTask,
  //       } as IPatchTaskColumnRequestDTO;
  //       responseData = await ApiService.patchTaskColumn(boardId, columnId, data);
  //     }

  //     if (!responseData) throw new Error('Could not patch task!');

  //     appDispatch({
  //       type: 'update-task',
  //       payload: { id: { boardId }, data: responseData },
  //     });
  //     return modalDispatch({ type: 'close-all', modalType: undefined });
  //   } catch (error) {
  //     console.error(error);
  //     return modalDispatch({
  //       type: 'open-modal',
  //       modalType: 'error',
  //       modalProps: { title: task.title },
  //     });
  //   }
  // };

  // DEBUG:  Key is the issue.
  // const subTasks = Object.keys(formData['input-group-1']).map((key) => {
  //   const obj = formData['input-group-1'][key];
  //   return (
  //     <InputTextSubtask
  //       key={obj.key}
  //       inputName={obj.inputName}
  //       value={obj.value}
  //       groupId="input-group-1"
  //       error={obj.error}
  //       deleteInput={deleteInputHandler}
  //       returnData={returnDataHandler}
  //     />
  //   );
  // });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className={styles.form__title}>Edit Task</p>
        <div className={styles.form__group}>
          <p>Title</p>
          <div className={`${styles.titleInput} ${errors.title ? styles.titleError : ''}`}>
            <input
              {...register('title', { required: 'Input required' })}
              className={styles.titleInput__input}
              type="text"
              placeholder="e.g. Web Design"
            />
          </div>
        </div>
        <div className={styles.form__group}>
          <p>Description</p>
          <div className={`${styles.descriptionInput} ${errors.description ? styles.descriptionError : ''}`}>
            <textarea
              {...register('description', { required: 'Input required' })}
              className={styles.descriptionInput__input}
              placeholder="It's always good to take a break. This 15 minute break will recharge the batteries a little"
            />
          </div>
        </div>
        <div className={styles.form__group}>
          <p>Sub-Tasks</p>
          <div className={styles.form__subTasks}>
            {fields.map((field, index) => (
              <div
                className={`${styles.subTask} ${errors?.subTasks?.[index]?.title ? styles.subTaskError : ''}`}
                key={field.id}>
                <div className={styles.subTask__container}>
                  <input
                    {...register(`subTasks.${index}.title` as const, { required: true })}
                    type="text"
                    className={styles.subTask__input}
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
