import { memo } from 'react';

import styles from './_InputText.module.scss';

interface ElemProps extends React.HTMLProps<HTMLInputElement> {
  appendclass?: string;
}

const InputText = memo((props: ElemProps): JSX.Element => {
  const { appendclass, id } = props;

  return (
    <label className={`${styles['container']} ${appendclass}`} htmlFor={id} data-testid="container">
      <p className={styles['container__title']}>{id}</p>
      <input type="text" className={styles['container__input']} id={id} {...props} />
    </label>
  );
});

// For debugging
InputText.displayName = 'Text Input';

export default InputText;
