import type { IFormAction, IFormState } from './Form';

type TProps = {
  formDispatch: React.Dispatch<IFormAction>;
  formState: IFormState;
};

function FormController(props: TProps): JSX.Element {
  const { formState, formDispatch } = props;

  console.log(formState, formDispatch);

  return <div className="">a</div>;
}

export default FormController;
