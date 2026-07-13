import type { IBoard } from '@Shared/types';

import type { TFormBoardValues } from '../shared';

import { Controller, useFieldArray, useForm } from 'react-hook-form';

import InputText from '@Components/custom/input-text/InputText';
import { useAppDispatchContext } from '@Context/AppContext';
import { useLoading, useLoadingUpdate } from '@Context/LoadingContext';
import { useRootModalContext } from '@Context/RootModalContext';
import ApiService from '@Services/Services';
import IconCross from '@Svg/icon-cross.svg';

import styles from './_BoardEdit.module.scss';

type TProps = {
  activeBoard: IBoard;
};

function BoardEdit(props: TProps): JSX.Element {
  const { activeBoard } = props;
  const appDispatch = useAppDispatchContext();
  const modalDispatch = useRootModalContext();
  const isLoading = useLoading();
  const setLoadingUpdate = useLoadingUpdate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormBoardValues>({
    defaultValues: { columns: [...activeBoard.columns], name: activeBoard.name },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
    rules: { required: 'Input required' },
  });

  const onSubmit = handleSubmit(async (data) => {
    // Format data according to schema
    const newBoard = {
      columns: data.columns,
      name: data.name,
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
        payload: {
          id: { boardId: activeBoard._id },
          data: responseData,
        },
        type: 'edit-board',
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

  const onSubmitClickHandler = () => {
    void onSubmit();
  };

  return (
    <div className={styles['container']}>
      <form className={styles['form']} onSubmit={onSubmitClickHandler}>
        <p className={styles['form__titleHeader']}>Edit Board</p>
        <div className={styles['form__group']}>
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
        <div className={styles['form__group']}>
          <p>Columns</p>
          <div className={styles['form__listItems']}>
            {fields.map((field, index) => (
              <div className={styles['form__subTask']} key={field.id}>
                <Controller
                  control={control}
                  name={`columns.${index}.name` as const}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <InputText
                      placeholder="Insert Column Name"
                      inputName={`columns.${index}.name`}
                      value={value}
                      error={!!errors.columns?.[index]?.name}
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
          <button type="button" className={styles['form__btnNewColumn']} onClick={() => append({ name: '' })}>
            + Add New Column
          </button>
        </div>
        <button type="submit" className={styles['form__btnCreateBoard']} disabled={isLoading}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default BoardEdit;
