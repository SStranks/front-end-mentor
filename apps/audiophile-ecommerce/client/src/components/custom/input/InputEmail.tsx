import { memo } from 'react';

import styles from './_InputText.module.scss';

interface ElemProps extends React.HTMLProps<HTMLInputElement> {
  appendclass?: string;
}

const InputEmail = memo((props: ElemProps): JSX.Element => {
  const { appendclass, id } = props;

  return (
    <label className={`${styles['container']} ${appendclass}`} htmlFor={id} data-testid="input_email">
      <p className={styles['container__title']}>{id}</p>
      <input type="email" className={styles['container__input']} id={id} {...props} />
    </label>
  );
});

// For debugging
InputEmail.displayName = 'Email Input';

export default InputEmail;
