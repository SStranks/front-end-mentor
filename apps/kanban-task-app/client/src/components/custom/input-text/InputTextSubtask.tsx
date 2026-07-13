import type { TReturnData } from '@Types/types';

import { useRef, useState } from 'react';

import IconCross from '@Svg/icon-cross.svg';

import styles from './_InputTextSubtask.module.scss';

const placeholderText = [
  'e.g. Make coffee',
  'e.g. Drink coffee and smile',
  'e.g. Think about coffee some more',
  'e.g. Go make another cup of coffee',
  'e.g. Schedule time to purchase more coffee',
  'e.g. Enjoy coffee and smile more',
];

type TProps = {
  deleteInput: (arg: TReturnData) => void;
  error: boolean;
  groupId: string;
  inputName: string;
  returnData: (arg: TReturnData) => void;
  value: string;
};

function InputTextSubtask(props: TProps): JSX.Element {
  const { inputName, value, groupId, error, deleteInput, returnData } = props;
  const [text, setText] = useState(value || '');
  // DEBUG:  Is this ref being utilized?
  const subtaskRef = useRef<HTMLDivElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setText(e.currentTarget.value);
  };

  const onBlurHandler = () => {
    returnData({ groupId, inputName, value: text });
  };

  const deleteClickHandler = () => {
    deleteInput({ groupId, inputName, value: text });
  };

  return (
    <div className={`${styles['subTask']} ${error && !text ? styles['error'] : ''}`} ref={subtaskRef}>
      <div className={styles['subTask__container']}>
        <input
          type="text"
          className={styles['subTask__input']}
          name={inputName}
          placeholder={placeholderText[0]}
          // placeholder={placeholderText[listId % placeholderText.length]}
          value={text}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
      </div>
      <button type="button" onClick={deleteClickHandler}>
        <img src={IconCross} alt="" className={styles['icon']} />
      </button>
    </div>
  );
}

export default InputTextSubtask;
