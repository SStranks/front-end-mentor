import { useState } from 'react';
import styles from './_InputText.module.scss';

type TProps = {
  placeholder: string;
  inputName: string;
  value: string;
  error: boolean;
  updateRHF: (...event: unknown[]) => void;
};

// NOTE:  This component is for consumption by React Hook Form <Controller />
function InputText(props: TProps): JSX.Element {
  const { placeholder, inputName, value, error, updateRHF } = props;
  const [text, setText] = useState(value || '');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget?.value;
    setText(inputValue);
    updateRHF(inputValue);
  };

  return (
    <div className={`${styles.container} ${error ? styles.error : ''}`}>
      <input
        type="text"
        className={styles.container__input}
        name={inputName}
        placeholder={placeholder}
        value={text}
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default InputText;
