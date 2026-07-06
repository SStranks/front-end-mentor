import { memo } from 'react';

import styles from './_InputText.module.scss';

interface ElemProps extends React.HTMLProps<HTMLInputElement> {
  appendclass?: string;
}

const InputTel = memo((props: ElemProps): JSX.Element => {
  const { appendclass, id } = props;

  return (
    <label className={`${styles['container']} ${appendclass}`} htmlFor={id} data-testid="input_tel">
      <p className={styles['container__title']}>{id}</p>
      <input type="tel" className={styles['container__input']} id={id} {...props} />
    </label>
  );
});

// For debugging
InputTel.displayName = 'Telephone Input';

export default InputTel;
