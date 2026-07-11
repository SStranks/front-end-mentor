import type { TReturnData } from '#Types/types';

import { useRef, useState } from 'react';

import styles from './_InputTextAreaOld.module.scss';

type TProps = {
  error: boolean;
  groupId: string | undefined;
  inputName: string;
  placeholder: string;
  returnData: (arg: TReturnData) => void;
  value: string;
};

function TextArea(props: TProps): JSX.Element {
  const { placeholder, inputName, value, groupId, error, returnData } = props;
  const [text, setText] = useState(value || '');
  const containerRef = useRef<HTMLDivElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    return setText(e.currentTarget.value);
  };

  const onBlurHandler = () => {
    returnData({ groupId, inputName, value: text });
  };

  return (
    <div className={`${styles['container']} ${error && !text ? styles['error'] : ''}`} ref={containerRef}>
      <textarea
        name={inputName}
        className={styles['container__input']}
        placeholder={placeholder}
        value={text}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default TextArea;
