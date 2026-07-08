import type { RefObject } from 'react';

import { useRef, useState } from 'react';

import styles from './InputDatePicker.module.scss';

interface IProps {
  currentDate: Date;
  currentYear: number;
  disabled: boolean;
  displayValue: string;
  inputRef: RefObject<HTMLInputElement>;
  setCurrentDate: (date: Date) => void;
}

function InputDatePickerYear(props: IProps): JSX.Element {
  const { currentDate, setCurrentDate, displayValue, currentYear, inputRef, disabled } = props;
  const [lastKeyPress, setLastKeyPress] = useState<string | null>(null);
  const displayValueRef = useRef<HTMLParagraphElement>(null);

  const inputOnKeyDown = (e: React.KeyboardEvent) => {
    // console.log(e.key);
    setLastKeyPress(e.key);

    switch (e.key) {
      case 'ArrowUp': {
        e.preventDefault();
        return setCurrentDate(new Date(new Date(currentDate).setFullYear(Math.min(currentYear + 1, 9999))));
      }
      case 'ArrowDown': {
        e.preventDefault();
        return setCurrentDate(new Date(new Date(currentDate).setFullYear(Math.max(currentYear - 1, 1))));
      }
      case '0': {
        if (lastKeyPress && currentYear <= 999) {
          return setCurrentDate(new Date(new Date(currentDate).setFullYear(currentYear * 10)));
        }
        return setCurrentDate(new Date(new Date(currentDate).setFullYear(1)));
      }
      case '1': {
        if (lastKeyPress && currentYear <= 999) {
          return setCurrentDate(new Date(new Date(currentDate).setFullYear(currentYear * 10)));
        }
        return setCurrentDate(new Date(new Date(currentDate).setFullYear(1)));
      }
      case '2': {
        if (lastKeyPress && currentYear <= 999) {
          return setCurrentDate(new Date(new Date(currentDate).setFullYear(currentYear * 10 + 2)));
        }
        return setCurrentDate(new Date(new Date(currentDate).setFullYear(2)));
      }
      case '3': {
        if (lastKeyPress && currentYear <= 999) {
          return setCurrentDate(new Date(new Date(currentDate).setFullYear(currentYear * 10 + 3)));
        }
        return setCurrentDate(new Date(new Date(currentDate).setFullYear(3)));
      }
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': {
        if (lastKeyPress && currentYear <= 999) {
          return setCurrentDate(new Date(new Date(currentDate).setFullYear(currentYear * 10 + Number(e.key))));
        }
        return setCurrentDate(new Date(new Date(currentDate).setFullYear(Number(e.key))));
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
        id="inputYear"
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
      <label htmlFor="inputYear">
        <p className={styles['displayValue']} ref={displayValueRef}>
          {displayValue}
        </p>
      </label>
    </>
  );
}

export default InputDatePickerYear;
