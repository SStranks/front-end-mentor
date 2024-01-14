import { useFieldArray, useForm } from 'react-hook-form';
import IconCross from '#Svg/icon-cross.svg';
import { AppDispatchContext } from '#Context/AppContext';
import RootModalDispatchContext from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import { useContext } from 'react';
import styles from './_BoardAdd.module.scss';

type TFormValues = {
  title: string;
  columns: { name: string }[];
};

type TProps = {
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

function BoardAdd(props: TProps): JSX.Element {
  const { setActiveBoardId } = props;
  const appDispatch = useContext(AppDispatchContext);
  const modalDispatch = useContext(RootModalDispatchContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: {
      columns: [{ name: 'Todo' }, { name: 'Doing' }, { name: 'Done' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'columns',
    control,
    rules: { required: 'Input required' },
  });

  const onSubmit = handleSubmit(async (data) => {
    // Format data according to schema
    const newBoard = {
      name: data.title,
      columns: data.columns,
    };

    // Send data to backend API
    try {
      const responseData = await ApiService.postBoard(newBoard);
      if (!responseData) throw new Error('Unable to post board!');

      console.log('ADDBOARD', responseData);

      modalDispatch({
        type: 'close-modal',
      });
      appDispatch({
        type: 'add-board',
        payload: {
          id: { boardId: responseData._id },
          data: responseData,
        },
      });
      return setActiveBoardId(responseData._id);
    } catch (error) {
      console.error(error);
      return modalDispatch({
        type: 'open-modal',
        modalType: 'error',
        modalProps: { title: newBoard.name },
      });
    }
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className={styles.form__title}>Add New Board</p>
        <div className={styles.form__group}>
          <p>Name</p>
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
          <p>Columns</p>
          <div className={styles.listItems}>
            {fields.map((field, index) => (
              <div
                className={`${styles.subTask} ${errors?.columns?.[index]?.name ? styles.subTaskError : ''}`}
                key={field.id}>
                <div className={styles.subTask__container}>
                  <input
                    {...register(`columns.${index}.name` as const, { required: true })}
                    type="text"
                    className={styles.subTask__input}
                  />
                </div>
                <button type="button" onClick={() => remove(index)}>
                  <img src={IconCross} alt="" className={styles.icon} />
                </button>
              </div>
            ))}
          </div>
          <button type="button" className={styles.form__btnNewColumn} onClick={() => append({ name: '' })}>
            + Add New Column
          </button>
        </div>
        <button type="submit" className={styles.form__btnCreateBoard}>
          Create New Board
        </button>
      </form>
    </div>
  );
}

export default BoardAdd;
