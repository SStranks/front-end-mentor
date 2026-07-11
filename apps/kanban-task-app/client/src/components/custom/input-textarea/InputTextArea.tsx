import { useState } from 'react';

import styles from './_InputTextArea.module.scss';

type TProps = {
  error: boolean;
  inputName: string;
  placeholder: string;
  updateRHF: (...event: unknown[]) => void;
  value: string;
};

function TextArea(props: TProps): JSX.Element {
  const { placeholder, inputName, value, error, updateRHF } = props;
  const [text, setText] = useState(value || '');

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.currentTarget.value;
    setText(inputValue);
    updateRHF(inputValue);
  };

  return (
    <div className={`${styles['container']} ${error ? styles['error'] : ''}`}>
      <textarea
        name={inputName}
        className={styles['container__input']}
        placeholder={placeholder}
        value={text}
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default TextArea;
