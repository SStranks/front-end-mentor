import type { RefObject } from 'react';

import { useRef, useState } from 'react';

import styles from './InputDatePicker.module.scss';

interface IProps {
  currentDate: Date;
  currentMonth: number;
  disabled: boolean;
  displayValue: string;
  inputRef: RefObject<HTMLInputElement>;
  rotateFocus: () => void;
  setCurrentDate: (date: Date) => void;
}

function InputDatePickerMonth(props: IProps): JSX.Element {
  const { currentDate, setCurrentDate, displayValue, currentMonth, inputRef, rotateFocus, disabled } = props;
  const [lastKeyPress, setLastKeyPress] = useState<string | null>(null);
  const displayValueRef = useRef<HTMLParagraphElement>(null);

  const inputOnKeyDown = (e: React.KeyboardEvent) => {
    // console.log(e.key);
    setLastKeyPress(e.key);

    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        return setCurrentDate(new Date(new Date(currentDate).setMonth(currentMonth + 1 > 11 ? 0 : currentMonth + 1)));
      }
      case 'ArrowDown': {
        e.preventDefault();
        return setCurrentDate(new Date(new Date(currentDate).setMonth(currentMonth - 1 < 0 ? 11 : currentMonth - 1)));
      }
      case '0': {
        if (lastKeyPress) {
          rotateFocus();
          return setCurrentDate(new Date(new Date(currentDate).setMonth(lastKeyPress === '0' ? 0 : 9)));
        }
        return setCurrentDate(new Date(new Date(currentDate).setMonth(0)));
      }
      case '1': {
        if (lastKeyPress) {
          rotateFocus();
          return setCurrentDate(new Date(new Date(currentDate).setMonth(lastKeyPress === '0' ? 0 : 10)));
        }
        return setCurrentDate(new Date(new Date(currentDate).setMonth(0)));
      }
      case '2': {
        if (lastKeyPress) {
          rotateFocus();
          return setCurrentDate(new Date(new Date(currentDate).setMonth(lastKeyPress === '0' ? 1 : 11)));
        }
        return setCurrentDate(new Date(new Date(currentDate).setMonth(1)));
      }
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': {
        rotateFocus();
        return setCurrentDate(new Date(new Date(currentDate).setMonth(Number(e.key) - 1)));
      }
      default: {
        return null;
      }
    }
  };

  const inputOnFocus = () => {
    displayValueRef.current?.classList.add(styles['active'] as string);
  };

  const inputOnBlur = () => {
    displayValueRef.current?.classList.remove(styles['active'] as string);
    setLastKeyPress(null);
  };

  return (
    <>
      <input
        type="text"
        className={styles['input']}
        id="inputMonth"
        ref={inputRef}
        readOnly
        disabled={disabled}
        value={displayValue}
        onKeyDown={inputOnKeyDown}
        onMouseMove={(e) => e.preventDefault()} // Prevent highlighting
        onTouchMove={(e) => e.preventDefault()} // Prevent highlighting
        onFocus={inputOnFocus}
        onBlur={inputOnBlur}
      />
      <label htmlFor="inputMonth">
        <p className={styles['displayValue']} ref={displayValueRef}>
          {displayValue}
        </p>
      </label>
    </>
  );
}

export default InputDatePickerMonth;
