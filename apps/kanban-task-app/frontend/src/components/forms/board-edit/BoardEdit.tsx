import type { TFormBoardValues } from '../shared';
import type { IBoard } from '#Shared/types';
import { useContext } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AppDispatchContext } from '#Context/AppContext';
import RootModalDispatchContext from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import IconCross from '#Svg/icon-cross.svg';
import styles from './_BoardEdit.module.scss';

type TProps = {
  activeBoard: IBoard;
};

function BoardEdit(props: TProps): JSX.Element {
  const { activeBoard } = props;
  const appDispatch = useContext(AppDispatchContext);
  const modalDispatch = useContext(RootModalDispatchContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormBoardValues>({
    defaultValues: { name: activeBoard.name, columns: [...activeBoard.columns] },
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

    // NOTE:  Need to think about column names in relation to IDs: 1) We need the IDs because if the user renames a column, how will we know which column to amend in the DB? 2) We need a warning that if they remove a column here then all task data will be erased!
    // NOTE:  Replacing the entire boards-columns data from the frontend, is this the best approach? Can we use .pre hook on the backend to amend column names/delete columns according to ID's passed perhaps?
    // Send data to backend API
    try {
      const responseData = await ApiService.patchBoard(`${activeBoard._id}`, newBoard);
      if (!responseData) throw new Error('Could not patch board!');

      modalDispatch({
        type: 'close-modal',
      });
      appDispatch({
        type: 'edit-board',
        payload: {
          id: { boardId: activeBoard._id },
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
        <p className={styles.form__title}>Edit Board</p>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default BoardEdit;
