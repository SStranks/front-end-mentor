import { memo } from 'react';

import styles from './_InputRadio.module.scss';

// TODO:  Set value attribute
interface ElemProps extends React.HTMLProps<HTMLInputElement> {
  appendclass?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputRadio = memo((props: ElemProps): JSX.Element => {
  const { appendclass, id } = props;

  return (
    <label className={`${styles['label']} ${appendclass}`} htmlFor={id} data-testid="input_radio">
      <input {...props} type="radio" className={styles['label__radioBtn']} />
      <p className={styles['label__title']}>{id}</p>
    </label>
  );
});

// For debugging
InputRadio.displayName = 'Radio Input';

export default InputRadio;
