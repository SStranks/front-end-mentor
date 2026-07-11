import type { TReturnData } from '#Types/types';

import { useRef, useState } from 'react';

import styles from './_InputTextOld.module.scss';

type TProps = {
  error: boolean;
  groupId: string | undefined;
  inputName: string;
  placeholder: string;
  returnData: (arg: TReturnData) => void;
  value: string;
};

function InputText(props: TProps): JSX.Element {
  const { placeholder, inputName, value, groupId, error, returnData } = props;
  const [text, setText] = useState(value || '');
  // DEBUG:  Is this ref being utilized?
  const element = useRef<HTMLDivElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setText(e.currentTarget.value);
  };

  const onBlurHandler = () => {
    returnData({ groupId, inputName, value: text });
  };

  return (
    <div className={`${styles['container']} ${error && !text ? styles['error'] : ''}`} ref={element}>
      <input
        type="text"
        className={styles['container__input']}
        name={inputName}
        placeholder={placeholder}
        value={text}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </div>
  );
}

export default InputText;
