import type { PropsWithChildren } from 'react';

type TProps = {
  formId: string;
};

function FormInput(props: PropsWithChildren<TProps>): JSX.Element {
  const { children, formId } = props;
  return <div data-formId={formId}>{children}</div>;
}

export default FormInput;
