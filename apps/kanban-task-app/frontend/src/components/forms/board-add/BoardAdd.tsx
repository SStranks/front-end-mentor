import type { TFormBoardValues } from '../shared';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import InputText from '#Components/custom/input-text/InputText';
import { useLoading, useLoadingUpdate } from '#Context/LoadingContext';
import { useAppDispatchContext } from '#Context/AppContext';
import { useRootModalContext } from '#Context/RootModalContext';
import ApiService from '#Services/Services';
import IconCross from '#Svg/icon-cross.svg';
import styles from './_BoardAdd.module.scss';

type TProps = {
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

function BoardAdd(props: TProps): JSX.Element {
  const { setActiveBoardId } = props;
  const modalDispatch = useRootModalContext();
  const appDispatch = useAppDispatchContext();
  const isLoading = useLoading();
  const setLoadingUpdate = useLoadingUpdate();
  const {
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
    console.log(data);

    // Format data according to schema
    const newBoard = {
      name: data.name,
      columns: data.columns,
    };

    // Send data to backend API
    setLoadingUpdate(true);
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
    } finally {
      setLoadingUpdate(false);
    }
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className={styles.form__titleHeader}>Add New Board</p>
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
          Create New Board
        </button>
      </form>
    </div>
  );
}

export default BoardAdd;
