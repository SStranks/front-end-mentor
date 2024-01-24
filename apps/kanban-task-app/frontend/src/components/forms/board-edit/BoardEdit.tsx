import type { TFormBoardValues } from '../shared';
import type { IBoard } from '#Shared/types';
import { useContext } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { AppDispatchContext } from '#Context/AppContext';
import RootModalDispatchContext from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import IconCross from '#Svg/icon-cross.svg';
import styles from './_BoardEdit.module.scss';
import InputText from '#Components/custom/input-text/InputText';
import { useLoading, useLoadingUpdate } from '#Context/LoadingContext';

type TProps = {
  activeBoard: IBoard;
};

function BoardEdit(props: TProps): JSX.Element {
  const { activeBoard } = props;
  const appDispatch = useContext(AppDispatchContext);
  const modalDispatch = useContext(RootModalDispatchContext);
  const isLoading = useLoading();
  const setLoadingUpdate = useLoadingUpdate();
  const {
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
    setLoadingUpdate(true);
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
    } finally {
      setLoadingUpdate(false);
    }
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className={styles.form__titleHeader}>Edit Board</p>
        <div className={styles.form__group}>
          <p>Name</p>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <InputText
                placeholder="e.g Web Design"
                inputName="name"
                value={value}
                error={!!errors.name}
                updateRHF={onChange}
              />
            )}
          />
        </div>
        <div className={styles.form__group}>
          <p>Columns</p>
          <div className={styles.form__listItems}>
            {fields.map((field, index) => (
              <div className={styles.form__subTask} key={field.id}>
                <Controller
                  control={control}
                  name={`columns.${index}.name` as const}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <InputText
                      placeholder="Insert Column Name"
                      inputName={`columns.${index}.name`}
                      value={value}
                      error={!!errors?.columns?.[index]?.name}
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
          <button type="button" className={styles.form__btnNewColumn} onClick={() => append({ name: '' })}>
            + Add New Column
          </button>
        </div>
        <button type="submit" className={styles.form__btnCreateBoard} disabled={isLoading}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default BoardEdit;
