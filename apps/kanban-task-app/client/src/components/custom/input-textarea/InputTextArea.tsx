import { useState } from 'react';
import styles from './_InputTextArea.module.scss';

type TProps = {
  placeholder: string;
  inputName: string;
  value: string;
  error: boolean;
  updateRHF: (...event: unknown[]) => void;
};

function TextArea(props: TProps): JSX.Element {
  const { placeholder, inputName, value, error, updateRHF } = props;
  const [text, setText] = useState(value || '');

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.currentTarget?.value;
    setText(inputValue);
    updateRHF(inputValue);
  };

  return (
    <div className={`${styles.container} ${error ? styles.error : ''}`}>
      <textarea
        name={inputName}
        className={styles.container__input}
        placeholder={placeholder}
        value={text}
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default TextArea;
