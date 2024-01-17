import type { TFormBoardValues } from '../shared';
import { useContext } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AppDispatchContext } from '#Context/AppContext';
import RootModalDispatchContext from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import IconCross from '#Svg/icon-cross.svg';
import styles from './_BoardAdd.module.scss';

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
  } = useForm<TFormBoardValues>({
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
      name: data.name,
      columns: data.columns,
    };

    // Send data to backend API
    try {
      const responseData = await ApiService.postBoard(newBoard);
      if (!responseData) throw new Error('Unable to post board!');

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
        <p className={styles.form__titleHeader}>Add New Board</p>
        <div className={styles.form__group}>
          <p>Name</p>
          <div className={`${styles.form__titleInput} ${errors.name ? styles['form__titleInput--error'] : ''}`}>
            <input {...register('name', { required: 'Input required' })} type="text" placeholder="e.g. Web Design" />
          </div>
        </div>
        <div className={styles.form__group}>
          <p>Columns</p>
          <div className={styles.form__listItems}>
            {fields.map((field, index) => (
              <div className={styles.form__subTask} key={field.id}>
                <div
                  className={`${styles.form__subTask__container} ${
                    errors?.columns?.[index]?.name ? styles['form__subTask__container--error'] : ''
                  }`}>
                  <input {...register(`columns.${index}.name` as const, { required: true })} type="text" />
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
